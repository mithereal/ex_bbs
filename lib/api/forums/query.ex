defmodule Api.Forums.Query do
  @moduledoc """
  The Forum context.
  """
  use Nebulex.Caching

  import Ecto.Query, warn: false
  alias Api.Repo

  alias Api.Forums.Forum
  alias Api.Posts.Post
  alias Api.Categories.Category
  alias Api.ForumCache
  alias Api.CategoryCache
  alias Api.PostCache
  alias Api.TopicCache

  @ttl :timer.hours(1)

  @doc """
  Returns the list of forums.

  ## Examples

      iex> list_forums()
      [%Forum{}, ...]

  """
  @decorate cacheable(cache: ForumCache)
  def list_forums do

    query =
      from f in Forum,
        left_join: t in Topic,
        left_join: c in Category,
        left_join: p in Post,
        left_join: p2 in Post,
        on: f.id == t.forum_id,
        on: c.id == t.category_id,
        on: t.id == p.topic_id,
        on: p.inserted_at < p2.inserted_at,
        where: is_nil(p2.id) or p.id == p2.id,
        select: {f.slug, c.slug, t.slug, p2.slug},
        limit: 10

    Repo.all(query)
  end

  @decorate cacheable(cache: ForumCache)
  def list_forums(limit) do
    import Ecto.Query

    query = Forum |> limit(^limit)

    Repo.all(query)
  end

  @doc """
  Gets a single forums.

  Raises `Ecto.NoResultsError` if the Forum does not exist.

  ## Examples

      iex> get_forums!(123)
      %Forum{}

      iex> get_forums!(456)
      ** (Ecto.NoResultsError)

  """
  def get_forums!(id), do: Repo.get!(Forum, id)

  @decorate cacheable(cache: ForumCache, key: {Forum, slug}, opts: [ttl: @ttl])
  def get_forum(slug), do: Repo.get_by(Forum, slug: slug)

  @doc """
  Creates a forums.

  ## Examples

      iex> create_forums(%{field: value})
      {:ok, %Forum{}}

      iex> create_forums(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  # @decorate cache_put(cache: ForumCache, key: {Forum, slug}, opts: [ttl: @ttl])
  def create_forums(attrs \\ %{}) do
    %Forum{}
    |> Forum.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a forums.

  ## Examples

      iex> update_forums(forums, %{field: new_value})
      {:ok, %Forum{}}

      iex> update_forums(forums, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  @decorate cache_put(
              cache: ForumCache,
              key: {Forum, forums.slug},
              match: &match_update/1,
              opts: [ttl: @ttl]
            )
  def update_forums(%Forum{} = forums, attrs) do
    forums
    |> Forum.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a forums.

  ## Examples

      iex> delete_forums(forums)
      {:ok, %Forum{}}

      iex> delete_forums(forums)
      {:error, %Ecto.Changeset{}}

  """
  @decorate cache_evict(cache: ForumCache, key: {Forum, forums.slug})
  def delete_forums(%Forum{} = forums) do
    Repo.delete(forums)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking forums changes.

  ## Examples

      iex> change_forums(forums)
      %Ecto.Changeset{data: %Forum{}}

  """
  @decorate cache_put(cache: Cache, key: {Forum, forums.slug}, opts: [ttl: @ttl])
  def change_forums(%Forum{} = forums, attrs \\ %{}) do
    Forum.changeset(forums, attrs)
  end

  @doc """
  Returns the list of categories.

  ## Examples

      iex> list_categories()
      [%Category{}, ...]

  """
  def list_categories do
    Repo.all(Category)
  end

  @doc """
  Returns the list of categories.

  ## Examples

      iex> online_categories()
      [%Category{}, ...]

  """
  @decorate cacheable(cache: CategoryCache)
  def online_categories do
    Repo.all(Category)
  end

  @doc """
  Gets a single categories.

  Raises `Ecto.NoResultsError` if the Category does not exist.

  ## Examples

      iex> get_categories!(123)
      %Category{}

      iex> get_categories!(456)
      ** (Ecto.NoResultsError)

  """
  def get_categories!(id), do: Repo.get!(Category, id)

  @decorate cacheable(cache: CategoryCache, key: {Category, slug}, opts: [ttl: @ttl])
  def get_category(slug), do: Repo.get_by(Category, slug: slug)

  @doc """
  Creates a categories.

  ## Examples

      iex> create_categories(%{field: value})
      {:ok, %Category{}}

      iex> create_categories(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  #  @decorate cache_put(cache: CategoryCache, key: {Category, slug}, opts: [ttl: @ttl])
  def create_categories(attrs \\ %{}) do
    %Category{}
    |> Category.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a categories.

  ## Examples

      iex> update_categories(categories, %{field: new_value})
      {:ok, %Category{}}

      iex> update_categories(categories, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  @decorate cache_put(
              cache: Cache,
              key: {Category, categories.slug},
              match: &match_update/1,
              opts: [ttl: @ttl]
            )
  def update_categories(%Category{} = categories, attrs) do
    categories
    |> Category.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a categories.

  ## Examples

      iex> delete_categories(categories)
      {:ok, %Category{}}

      iex> delete_categories(categories)
      {:error, %Ecto.Changeset{}}

  """
  @decorate cache_evict(cache: CategoryCache, key: {Category, categories.slug})
  def delete_categories(%Category{} = categories) do
    Repo.delete(categories)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking categories changes.

  ## Examples

      iex> change_categories(categories)
      %Ecto.Changeset{data: %Category{}}

  """
  @decorate cache_put(cache: Cache, key: {Category, categories.slug}, opts: [ttl: @ttl])
  def change_categories(%Category{} = categories, attrs \\ %{}) do
    Category.changeset(categories, attrs)
  end

  alias Api.Topics.Topic

  @doc """
  Returns the list of topics.

  ## Examples

      iex> list_topics()
      [%Topic{}, ...]

  """
  def list_topics do
    Repo.all(Topic)
  end

  def list_topics(limit) do
    import Ecto.Query

    query = Topic |> limit(^limit)

    Repo.all(query)
  end

  @doc """
  Gets a single topics.

  Raises `Ecto.NoResultsError` if the Topic does not exist.

  ## Examples

      iex> get_topics!(123)
      %Topic{}

      iex> get_topics!(456)
      ** (Ecto.NoResultsError)

  """
  def get_topics!(id), do: Repo.get!(Topic, id)

  @decorate cacheable(cache: TopicCache, key: {Topic, slug}, opts: [ttl: @ttl])
  def get_topic(slug), do: Repo.get_by(Topic, slug: slug)

  @doc """
  Creates a topics.

  ## Examples

      iex> create_topics(%{field: value})
      {:ok, %Topic{}}

      iex> create_topics(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  # @decorate cache_put(cache: TopicCache, key: {Topic, slug}, opts: [ttl: @ttl])
  def create_topics(attrs \\ %{}) do
    %Topic{}
    |> Topic.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a topics.

  ## Examples

      iex> update_topics(topics, %{field: new_value})
      {:ok, %Topic{}}

      iex> update_topics(topics, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  @decorate cache_put(
              cache: TopicCache,
              key: {Topic, topics.slug},
              match: &match_update/1,
              opts: [ttl: @ttl]
            )
  def update_topics(%Topic{} = topics, attrs) do
    topics
    |> Topic.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a topics.

  ## Examples

      iex> delete_topics(topics)
      {:ok, %Topic{}}

      iex> delete_topics(topics)
      {:error, %Ecto.Changeset{}}

  """
  @decorate cache_evict(cache: TopicCache, key: {Topic, topics.slug})
  def delete_topics(%Topic{} = topics) do
    Repo.delete(topics)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking topics changes.

  ## Examples

      iex> change_topics(topics)
      %Ecto.Changeset{data: %Topic{}}

  """
  @decorate cache_put(cache: TopicCache, key: {Topic, topics.slug}, opts: [ttl: @ttl])
  def change_topics(%Topic{} = topics, attrs \\ %{}) do
    Topic.changeset(topics, attrs)
  end

  alias Api.Posts.Post

  @doc """
  Returns the list of posts.

  ## Examples

      iex> list_posts()
      [%Post{}, ...]

  """
  def list_posts do
    Repo.all(Post)
  end

  def list_posts(limit) do
    import Ecto.Query

    query = Post |> limit(^limit)

    Repo.all(query)
  end

  @doc """
  Gets a single posts.

  Raises `Ecto.NoResultsError` if the Post does not exist.

  ## Examples

      iex> get_posts!(123)
      %Post{}

      iex> get_posts!(456)
      ** (Ecto.NoResultsError)

  """
  def get_posts!(id), do: Repo.get!(Post, id)
  def get_posts(slug), do: Repo.get_by(Post, slug: slug)

  @decorate cacheable(cache: PostCache, key: {Post, slug}, opts: [ttl: @ttl])
  def get_post(slug), do: Repo.get_by(Post, slug: slug)

  @doc """
  Creates a posts.

  ## Examples

      iex> create_posts(%{field: value})
      {:ok, %Post{}}

      iex> create_posts(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  #  @decorate cache_put(cache: PostCache, key: {Post, slug}, opts: [ttl: @ttl])
  def create_posts(attrs \\ %{}) do
    %Post{}
    |> Post.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a posts.

  ## Examples

      iex> update_posts(posts, %{field: new_value})
      {:ok, %Post{}}

      iex> update_posts(posts, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  @decorate cache_put(
              cache: PostCache,
              key: {Post, posts.slug},
              match: &match_update/1,
              opts: [ttl: @ttl]
            )
  def update_posts(%Post{} = posts, attrs) do
    posts
    |> Post.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a posts.

  ## Examples

      iex> delete_posts(posts)
      {:ok, %Post{}}

      iex> delete_posts(posts)
      {:error, %Ecto.Changeset{}}

  """
  @decorate cache_evict(cache: PostCache, key: {Post, posts.slug})
  def delete_posts(%Post{} = posts) do
    Repo.delete(posts)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking posts changes.

  ## Examples

      iex> change_posts(posts)
      %Ecto.Changeset{data: %Post{}}

  """
  @decorate cache_put(cache: PostCache, key: {Post, posts.slug}, opts: [ttl: @ttl])
  def change_posts(%Post{} = posts, attrs \\ %{}) do
    Post.changeset(posts, attrs)
  end

  defp match_update({:ok, value}), do: {true, value}
  defp match_update({:error, _}), do: false

  alias Api.System.Status

  @doc """
  Returns the list of status.

  ## Examples

      iex> list_status()
      [%Status{}, ...]

  """
  def list_status do
    Repo.all(Status)
  end

  @doc """
  Gets a single status.

  Raises `Ecto.NoResultsError` if the Status does not exist.

  ## Examples

      iex> get_status!(123)
      %Status{}

      iex> get_status!(456)
      ** (Ecto.NoResultsError)

  """
  def get_status!(id), do: Repo.get!(Status, id)

  @doc """
  Creates a status.

  ## Examples

      iex> create_status(%{field: value})
      {:ok, %Status{}}

      iex> create_status(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_status(attrs \\ %{}) do
    %Status{}
    |> Status.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a status.

  ## Examples

      iex> update_status(status, %{field: new_value})
      {:ok, %Status{}}

      iex> update_status(status, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_status(%Status{} = status, attrs) do
    status
    |> Status.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a status.

  ## Examples

      iex> delete_status(status)
      {:ok, %Status{}}

      iex> delete_status(status)
      {:error, %Ecto.Changeset{}}

  """
  def delete_status(%Status{} = status) do
    Repo.delete(status)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking status changes.

  ## Examples

      iex> change_status(status)
      %Ecto.Changeset{data: %Status{}}

  """
  def change_status(%Status{} = status, attrs \\ %{}) do
    Status.changeset(status, attrs)
  end
end
