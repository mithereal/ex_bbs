defmodule Api.Forum do
  @moduledoc """
  The Forum context.
  """
  use Nebulex.Caching

  import Ecto.Query, warn: false
  alias Ecto.Multi
  alias Api.Repo

  alias Api.Forum.Forums
  alias Api.ForumCache
  alias Api.CategoryCache
  alias Api.PostCache
  alias Api.TopicCache

  @ttl :timer.hours(1)

  @doc """
  Returns the list of forums.

  ## Examples

      iex> list_forums()
      [%Forums{}, ...]

  """
  @decorate cacheable(cache: ForumCache)
  def list_forums do
    Repo.all(Forums) |> preload(:topics)

    multi =
      Multi.new()
      |> Multi.run(:forums, Repo.all(Forums) |> preload(:topics))
      |> Multi.run(:reply, &topics_data/2)

    case Repo.transaction(multi) do
      {:ok, response} ->
        response

      {:error, _step, code, _multi} ->
        nil
    end
  end

  def topics_data(_repo, %{forums: forums}) do
    {:ok, forums}
  end

  @decorate cacheable(cache: ForumCache)
  def list_forums(limit) do
    import Ecto.Query

    query = Forums |> limit(^limit)

    Repo.all(query)
  end

  @doc """
  Gets a single forums.

  Raises `Ecto.NoResultsError` if the Forums does not exist.

  ## Examples

      iex> get_forums!(123)
      %Forums{}

      iex> get_forums!(456)
      ** (Ecto.NoResultsError)

  """
  def get_forums!(id), do: Repo.get!(Forums, id)

  @decorate cacheable(cache: ForumCache, key: {Forums, slug}, opts: [ttl: @ttl])
  def get_forum(slug), do: Repo.get_by(Forums, slug: slug)

  @doc """
  Creates a forums.

  ## Examples

      iex> create_forums(%{field: value})
      {:ok, %Forums{}}

      iex> create_forums(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  @decorate cache_put(cache: ForumCache, key: {Forums, slug}, opts: [ttl: @ttl])
  def create_forums(attrs \\ %{}) do
    %Forums{}
    |> Forums.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a forums.

  ## Examples

      iex> update_forums(forums, %{field: new_value})
      {:ok, %Forums{}}

      iex> update_forums(forums, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  @decorate cache_put(cache: ForumCache, key: {Forums, slug}, opts: [ttl: @ttl])
  def update_forums(%Forums{} = forums, attrs) do
    forums
    |> Forums.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a forums.

  ## Examples

      iex> delete_forums(forums)
      {:ok, %Forums{}}

      iex> delete_forums(forums)
      {:error, %Ecto.Changeset{}}

  """
  @decorate cache_evict(cache: ForumCache, key: {Forums, slug})
  def delete_forums(%Forums{} = forums) do
    Repo.delete(forums)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking forums changes.

  ## Examples

      iex> change_forums(forums)
      %Ecto.Changeset{data: %Forums{}}

  """
  @decorate cache_put(cache: Cache, key: {Forums, slug}, opts: [ttl: @ttl])
  def change_forums(%Forums{} = forums, attrs \\ %{}) do
    Forums.changeset(forums, attrs)
  end

  alias Api.Forum.Categories

  @doc """
  Returns the list of categories.

  ## Examples

      iex> list_categories()
      [%Categories{}, ...]

  """
  def list_categories do
    Repo.all(Categories)
  end

  @doc """
  Returns the list of categories.

  ## Examples

      iex> online_categories()
      [%Categories{}, ...]

  """
  @decorate cacheable(cache: CategoryCache)
  def online_categories do
    Repo.all(Categories)
  end

  @doc """
  Gets a single categories.

  Raises `Ecto.NoResultsError` if the Categories does not exist.

  ## Examples

      iex> get_categories!(123)
      %Categories{}

      iex> get_categories!(456)
      ** (Ecto.NoResultsError)

  """
  def get_categories!(id), do: Repo.get!(Categories, id)

  @decorate cacheable(cache: CategoryCache, key: {Categories, slug}, opts: [ttl: @ttl])
  def get_category(slug), do: Repo.get_by(Categories, slug: slug)

  @doc """
  Creates a categories.

  ## Examples

      iex> create_categories(%{field: value})
      {:ok, %Categories{}}

      iex> create_categories(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  @decorate cache_put(cache: CategoryCache, key: {Categories, slug}, opts: [ttl: @ttl])
  def create_categories(attrs \\ %{}) do
    %Categories{}
    |> Categories.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a categories.

  ## Examples

      iex> update_categories(categories, %{field: new_value})
      {:ok, %Categories{}}

      iex> update_categories(categories, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  @decorate cache_put(cache: Cache, key: {Categories, slug}, opts: [ttl: @ttl])
  def update_categories(%Categories{} = categories, attrs) do
    categories
    |> Categories.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a categories.

  ## Examples

      iex> delete_categories(categories)
      {:ok, %Categories{}}

      iex> delete_categories(categories)
      {:error, %Ecto.Changeset{}}

  """
  @decorate cache_evict(cache: CategoryCache, key: {Categories, slug})
  def delete_categories(%Categories{} = categories) do
    Repo.delete(categories)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking categories changes.

  ## Examples

      iex> change_categories(categories)
      %Ecto.Changeset{data: %Categories{}}

  """
  @decorate cache_put(cache: Cache, key: {Categories, slug}, opts: [ttl: @ttl])
  def change_categories(%Categories{} = categories, attrs \\ %{}) do
    Categories.changeset(categories, attrs)
  end

  alias Api.Forum.Topics

  @doc """
  Returns the list of topics.

  ## Examples

      iex> list_topics()
      [%Topics{}, ...]

  """
  def list_topics do
    Repo.all(Topics)
  end

  def list_topics(limit) do
    import Ecto.Query

    query = Topics |> limit(^limit)

    Repo.all(query)
  end

  @doc """
  Gets a single topics.

  Raises `Ecto.NoResultsError` if the Topics does not exist.

  ## Examples

      iex> get_topics!(123)
      %Topics{}

      iex> get_topics!(456)
      ** (Ecto.NoResultsError)

  """
  def get_topics!(id), do: Repo.get!(Topics, id)

  @decorate cacheable(cache: TopicCache, key: {Topics, slug}, opts: [ttl: @ttl])
  def get_topic(slug), do: Repo.get_by(Topics, slug: slug)

  @doc """
  Creates a topics.

  ## Examples

      iex> create_topics(%{field: value})
      {:ok, %Topics{}}

      iex> create_topics(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  @decorate cache_put(cache: TopicCache, key: {Topics, slug}, opts: [ttl: @ttl])
  def create_topics(attrs \\ %{}) do
    %Topics{}
    |> Topics.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a topics.

  ## Examples

      iex> update_topics(topics, %{field: new_value})
      {:ok, %Topics{}}

      iex> update_topics(topics, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  @decorate cache_put(cache: TopicCache, key: {Topics, slug}, opts: [ttl: @ttl])
  def update_topics(%Topics{} = topics, attrs) do
    topics
    |> Topics.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a topics.

  ## Examples

      iex> delete_topics(topics)
      {:ok, %Topics{}}

      iex> delete_topics(topics)
      {:error, %Ecto.Changeset{}}

  """
  @decorate cache_evict(cache: TopicCache, key: {Topics, slug})
  def delete_topics(%Topics{} = topics) do
    Repo.delete(topics)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking topics changes.

  ## Examples

      iex> change_topics(topics)
      %Ecto.Changeset{data: %Topics{}}

  """
  @decorate cache_put(cache: TopicCache, key: {Topics, slug}, opts: [ttl: @ttl])
  def change_topics(%Topics{} = topics, attrs \\ %{}) do
    Topics.changeset(topics, attrs)
  end

  alias Api.Forum.Posts

  @doc """
  Returns the list of posts.

  ## Examples

      iex> list_posts()
      [%Posts{}, ...]

  """
  def list_posts do
    Repo.all(Posts)
  end

  def list_posts(limit) do
    import Ecto.Query

    query = Posts |> limit(^limit)

    Repo.all(query)
  end

  @doc """
  Gets a single posts.

  Raises `Ecto.NoResultsError` if the Posts does not exist.

  ## Examples

      iex> get_posts!(123)
      %Posts{}

      iex> get_posts!(456)
      ** (Ecto.NoResultsError)

  """
  def get_posts!(id), do: Repo.get!(Posts, id)

  @decorate cacheable(cache: PostCache, key: {Posts, slug}, opts: [ttl: @ttl])
  def get_post(slug), do: Repo.get_by(Posts, slug: slug)

  @doc """
  Creates a posts.

  ## Examples

      iex> create_posts(%{field: value})
      {:ok, %Posts{}}

      iex> create_posts(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  @decorate cache_put(cache: PostCache, key: {Posts, slug}, opts: [ttl: @ttl])
  def create_posts(attrs \\ %{}) do
    %Posts{}
    |> Posts.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a posts.

  ## Examples

      iex> update_posts(posts, %{field: new_value})
      {:ok, %Posts{}}

      iex> update_posts(posts, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  @decorate cache_put(cache: PostCache, key: {Posts, slug}, opts: [ttl: @ttl])
  def update_posts(%Posts{} = posts, attrs) do
    posts
    |> Posts.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a posts.

  ## Examples

      iex> delete_posts(posts)
      {:ok, %Posts{}}

      iex> delete_posts(posts)
      {:error, %Ecto.Changeset{}}

  """
  @decorate cache_evict(cache: PostCache, key: {Posts, slug})
  def delete_posts(%Posts{} = posts) do
    Repo.delete(posts)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking posts changes.

  ## Examples

      iex> change_posts(posts)
      %Ecto.Changeset{data: %Posts{}}

  """
  @decorate cache_put(cache: PostCache, key: {Posts, slug}, opts: [ttl: @ttl])
  def change_posts(%Posts{} = posts, attrs \\ %{}) do
    Posts.changeset(posts, attrs)
  end
end
