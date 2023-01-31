defmodule Api.Forum.Posts do
  @moduledoc """
  The Posts context.
  """

  @moduledoc """
  The Posts context.
  """

  import Ecto.Query, warn: false
  alias Ecto.Multi

  alias Api.{
    Repo,
    Topics,
    Notifications,
    Posts,
    Accounts
    }

  alias Posts.Post
  alias Topics.Topic
  alias Accounts.User
  alias Api.Followers.Follow

  @username_regex ~r{@([A-Za-z0-9]+)}

  @doc """
  Returns the list of posts.

  ## Examples

      iex> list_posts()
      [%Post{}, ...]

  """
  def list_posts do
    Repo.all(Post)
  end

  @doc """
  Gets a single post.

  Raises `Ecto.NoResultsError` if the Post does not exist.

  ## Examples

      iex> get_post!(123)
      %Post{}

      iex> get_post!(456)
      ** (Ecto.NoResultsError)

  """
  def get_post!(id), do: Repo.get!(Post, id)

  @doc """
  Creates a post.

  ## Examples

      iex> create_post(%{field: value})
      {:ok, %Post{}}

      iex> create_post(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_post(attrs \\ %{}) do
    %Post{}
    |> Post.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a post.

  ## Examples

      iex> update_post(post, %{field: new_value})
      {:ok, %Post{}}

      iex> update_post(post, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_post(%Post{} = post, attrs) do
    post
    |> Post.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a Post.

  ## Examples

      iex> delete_post(post)
      {:ok, %Post{}}

      iex> delete_post(post)
      {:error, %Ecto.Changeset{}}

  """
  def delete_post(%Post{} = post) do
    Multi.new()
    |> Multi.delete(:post, post)
    |> decrease_topic_post_count()
    |> Repo.transaction()
  end

  defp decrease_topic_post_count(multi) do
    update_topic_fn = fn _repo, %{post: post} ->
      topic =
        post
        |> Post.preload_topic()
        |> Map.fetch!(:topic)

      attrs = %{post_count: topic.post_count - 1}
      Topics.update_topic(topic, attrs)
    end

    Multi.run(multi, :decrease_topic_post_count, update_topic_fn)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking post changes.

  ## Examples

      iex> change_post(post)
      %Ecto.Changeset{source: %Post{}}

  """
  def change_post(%Post{} = post) do
    Post.changeset(post, %{})
  end

  @doc """
  Get the post count of a postable.

  ## Examples

      iex> get_post_count(user: %User{})
      10

      iex> get_post_count(topic: %Topic{})
      2

  """
  @spec get_post_count(Keyword.t()) :: non_neg_integer()
  def get_post_count(clauses) do
    query =
      clauses
      |> get_postable_from_clauses()
      |> case do
           %Topic{} = topic -> Post.by_topic(topic)
           %Post{} = post -> Post.by_parent(post)
           %User{} = user -> Post.by_user(user)
         end

    query
    |> join(:inner, [r], u in assoc(r, :user))
    |> Repo.aggregate(:count, :id)
  end

  @doc """
  Gets all post count.
  """
  @spec get_total_post_count :: non_neg_integer()
  def get_total_post_count do
    Post
    |> Repo.aggregate(:count, :id)
  end

  defp get_postable_from_clauses(clauses) do
    cond do
      Keyword.has_key?(clauses, :user) -> Keyword.get(clauses, :user)
      Keyword.has_key?(clauses, :topic) -> Keyword.get(clauses, :topic)
      Keyword.has_key?(clauses, :post) -> Keyword.get(clauses, :post)
    end
  end

  @doc """
  Return the recent of topics.
  """
  @spec recent_posts(User.t()) :: [Topic.t()] | nil
  def recent_posts(%User{} = user) do
    user
    |> Post.by_user()
    |> Post.recent()
    |> Repo.all()
    |> Repo.preload([:topic, :user])
  end

  @doc """
  Inserts a post.

  ## Examples

      iex> insert_post(%User{}, %{field: value})
      {:ok, %Post{}}

      iex> insert_post(%User{}, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  @spec insert_post(User.t(), map()) :: {:ok, Post.t()} | {:error, Ecto.Changeset.t()}
  def insert_post(user, attrs \\ %{}) do
    attrs = attrs |> Map.put("user_id", user.id)
    post_changeset = Post.changeset(%Post{}, attrs)

    Multi.new()
    |> Multi.insert(:post, post_changeset)
    |> update_related_topic()
    |> maybe_notify_follower_of_new_post()
    |> notify_topic_owner_of_new_post()
    |> maybe_notify_mention_users_of_new_post(attrs)
    |> maybe_notify_parent_post_owner_of_new_post(attrs)
    |> Repo.transaction()
  end

  # Notification mention @ users.
  def maybe_notify_mention_users_of_new_post(multi, attrs) do
    insert_notification_fn = fn %{post: post} ->
      notified_users =
        @username_regex
        |> Regex.scan(attrs["content"])
        |> Enum.map(fn [_, match] -> Accounts.get_user_by_username(match) end)
        |> Enum.filter(&(not is_nil(&1)))

      attrs = %{
        actor_id: post.user_id,
        action: "post_mentioned",
        post_id: post.id,
        notified_users: notified_users
      }

      case Notifications.insert_notification(attrs) do
        {:ok, %{notification: notification}} -> {:ok, notification}
        {:error, _, reason, _} -> {:error, reason}
      end
    end

    Multi.run(multi, :notify_mention_users_of_new_post, insert_notification_fn)
  end

  # Update assoc topic.
  defp update_related_topic(multi) do
    update_topic_fn = fn %{post: post} ->
      topic =
        post
        |> Post.preload_topic()
        |> Map.fetch!(:topic)

      attrs = %{
        last_post_id: post.id,
        last_post_user_id: post.user_id,
        post_count: topic.post_count + 1
      }

      case Topics.update_topic(topic, attrs) do
        {:ok, topic} -> {:ok, topic}
        {:error, reason} -> {:error, reason}
      end
    end

    Multi.run(multi, :update_related_topic, update_topic_fn)
  end

  # Notificaton topic owner.
  defp notify_topic_owner_of_new_post(multi) do
    insert_notification_fn = fn %{post: post} ->
      # post -> topic -> user
      notified_users =
        post
        |> Post.preload_topic()
        |> Map.fetch!(:topic)
        |> Topic.preload_user()
        |> Map.fetch!(:user)

      attrs = %{
        actor_id: post.user_id,
        action: "topic_post_added",
        post_id: post.id,
        notified_users: [notified_users]
      }

      case Notifications.insert_notification(attrs) do
        {:ok, %{notification: notification}} -> {:ok, notification}
        {:error, _, reason, _} -> {:error, reason}
      end
    end

    Multi.run(multi, :notify_topic_owner_of_new_post, insert_notification_fn)
  end

  # 如果是回复其他人的评论，回复该评论的作者, 有新的回复。
  defp maybe_notify_parent_post_owner_of_new_post(multi, %{"parent_id" => parent_id})
       when parent_id != "" do
    insert_notification_fn = fn %{post: post} ->
      notified_users =
        post
        |> Post.preload_parent()
        |> Map.fetch!(:parent)
        |> Post.preload_user()
        |> Map.fetch!(:user)

      attrs = %{
        actor_id: post.user_id,
        action: "post_comment_added",
        post_id: post.id,
        notified_users: [notified_users]
      }

      case Notifications.insert_notification(attrs) do
        {:ok, %{notification: notification}} -> {:ok, notification}
        {:error, _, reason, _} -> {:error, reason}
      end
    end

    Multi.run(multi, :notify_parent_post_owner_of_new_post, insert_notification_fn)
  end

  defp maybe_notify_parent_post_owner_of_new_post(multi, _), do: multi

  # 发起评论时，通知关注评论作者的 follower
  defp maybe_notify_follower_of_new_post(multi) do
    insert_notification_fn = fn %{post: post} ->
      # 取关注评论作者的 follower.
      notified_users = notifiable_users_of_post(post)

      attrs = %{
        actor_id: post.user_id,
        action: "topic_post_added",
        post_id: post.id,
        notified_users: notified_users
      }

      case Notifications.insert_notification(attrs) do
        {:ok, %{notification: notification}} -> {:ok, notification}
        {:error, _, reason, _} -> {:error, reason}
      end
    end

    Multi.run(multi, :notify_users_of_new_post, insert_notification_fn)
  end

  defp notifiable_users_of_post(%Post{} = post) do
    query =
      from u in User,
           join: f in Follow,
           on: f.follower_id == u.id,
           where: f.user_id == ^post.user_id

    Repo.all(query)
  end

  @doc """
  Gets post author.

  ## Example

      iex> author(%Topic{})
      %User{}

  """
  @spec author(Post.t()) :: User.t()
  def author(%Post{} = post) do
    post
    |> Post.preload_user()
    |> Map.fetch!(:user)
  end
end
