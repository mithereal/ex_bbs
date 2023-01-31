defmodule Api.Stars.Star do
  @moduledoc false

  use Ecto.Schema
  import Ecto.{Changeset, Query}

  alias Api.{
    Repo,
    Topics.Topic,
    Posts.Post,
    Accounts.User,
    Stars.Star
  }

  @type t :: %Star{}

  schema "stars" do
    belongs_to :post, Post
    belongs_to :user, User
    belongs_to :topic, Topic

    timestamps()
  end

  @doc """
  Filters the topic by star.
  """
  @spec by_topic(Ecto.Queryable.t(), Topic.t()) :: Ecto.Query.t()
  def by_topic(query \\ __MODULE__, %Topic{id: topic_id}),
    do: from(s in query, where: s.topic_id == ^topic_id)

  @doc """
  Filters the post by star.
  """
  @spec by_post(Ecto.Queryable.t(), Post.t()) :: Ecto.Query.t()
  def by_post(query \\ __MODULE__, %Post{id: post_id}),
    do: from(s in query, where: s.post_id == ^post_id)

  @doc """
  Preloads the post of a topic.
  """
  @spec preload_post(t()) :: t()
  def preload_post(star), do: Repo.preload(star, :post)

  @doc """
  Preloads the post of a topic.
  """
  @spec preload_topic(t()) :: t()
  def preload_topic(star), do: Repo.preload(star, :topic)

  @doc false
  def changeset(star, attrs) do
    permitted_attrs = ~w(
      user_id
      post_id
      topic_id
    )a

    required_attrs = ~w(
      user_id
    )a

    star
    |> cast(attrs, permitted_attrs)
    |> validate_required(required_attrs)
  end
end
