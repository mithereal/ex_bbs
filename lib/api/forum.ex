defmodule Api.Forum do
  @moduledoc """
  The Forum context.
  """

  import Ecto.Query, warn: false
  alias Api.Repo

  alias Api.Forum.Forums

  @doc """
  Returns the list of forums.

  ## Examples

      iex> list_forums()
      [%Forums{}, ...]

  """
  def list_forums do
    Repo.all(Forums)
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

  @doc """
  Creates a forums.

  ## Examples

      iex> create_forums(%{field: value})
      {:ok, %Forums{}}

      iex> create_forums(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
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
  def delete_forums(%Forums{} = forums) do
    Repo.delete(forums)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking forums changes.

  ## Examples

      iex> change_forums(forums)
      %Ecto.Changeset{data: %Forums{}}

  """
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
  def online_categories do
    :ets.lookup(:bbs_categories, :id)
  end
  @doc """
  Returns the list of categories.

  ## Examples

      iex> online_category_data()
      [%Categories{}, ...]

  """
  def online_category_data do
    :ets.lookup(:bbs_categories_data, :data)
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

  @doc """
  Creates a categories.

  ## Examples

      iex> create_categories(%{field: value})
      {:ok, %Categories{}}

      iex> create_categories(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
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
  def delete_categories(%Categories{} = categories) do
    Repo.delete(categories)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking categories changes.

  ## Examples

      iex> change_categories(categories)
      %Ecto.Changeset{data: %Categories{}}

  """
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

  @doc """
  Creates a topics.

  ## Examples

      iex> create_topics(%{field: value})
      {:ok, %Topics{}}

      iex> create_topics(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
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
  def delete_topics(%Topics{} = topics) do
    Repo.delete(topics)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking topics changes.

  ## Examples

      iex> change_topics(topics)
      %Ecto.Changeset{data: %Topics{}}

  """
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

    query = Posts  |> limit(^limit)

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

  @doc """
  Creates a posts.

  ## Examples

      iex> create_posts(%{field: value})
      {:ok, %Posts{}}

      iex> create_posts(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
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
  def delete_posts(%Posts{} = posts) do
    Repo.delete(posts)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking posts changes.

  ## Examples

      iex> change_posts(posts)
      %Ecto.Changeset{data: %Posts{}}

  """
  def change_posts(%Posts{} = posts, attrs \\ %{}) do
    Posts.changeset(posts, attrs)
  end
end
