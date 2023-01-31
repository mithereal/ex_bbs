defmodule Api.Posts.Post do
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

  @type t :: %Post{}

  schema "bbs_posts" do
    field :content, :string
    field :star_count, :integer, default: 0

    belongs_to :user, User
    belongs_to :topic, Topic
    belongs_to :parent, Post, foreign_key: :parent_id

    has_many :children, Post, foreign_key: :parent_id
    has_many :stars, Star

    timestamps()
  end

  @doc """
  Returns the children node.
  """
  @spec is_child(Ecto.Queryable.t()) :: Ecto.Query.t()
  def is_child(query \\ __MODULE__),
    do: from(q in query, where: not is_nil(q.parent_id))

  @doc """
  Filters the topic by post.
  """
  @spec by_topic(Ecto.Queryable.t(), Topic.t()) :: Ecto.Query.t()
  def by_topic(query \\ __MODULE__, %Topic{id: topic_id}),
    do: where(query, [..., r], r.topic_id == ^topic_id)

  @doc """
  Filters the parent by post.
  """
  @spec by_parent(Ecto.Queryable.t(), t()) :: Ecto.Query.t()
  def by_parent(query \\ __MODULE__, %__MODULE__{id: parent_id}),
    do: where(query, [..., r], r.parent_id == ^parent_id)

  @doc """
  Filters post by user.
  """
  @spec by_user(Ecto.Queryable.t(), User.t()) :: Ecto.Query.t()
  def by_user(query \\ __MODULE__, %User{id: user_id}),
    do: where(query, [..., r], r.user_id == ^user_id)

  @doc """
  Get the recent of posts.
  """
  @spec recent(Ecto.Queryable.t()) :: Ecto.Query.t()
  def recent(query \\ __MODULE__),
    do: from(r in query, order_by: [desc: r.id], limit: 10)

  @doc """
  Preloads the user of a post.
  """
  @spec preload_user(t()) :: t()
  def preload_user(post), do: Repo.preload(post, [:user])

  @doc """
  Preloads the topic of a post.
  """
  @spec preload_topic(t()) :: t()
  def preload_topic(post), do: Repo.preload(post, [:topic])

  @doc """
  Preloads the parent of a post.
  """
  @spec preload_parent(t()) :: t()
  def preload_parent(post), do: Repo.preload(post, [:parent])

  @doc false
  def changeset(post, attrs) do
    permitted_attrs = ~w(
      star_count
      topic_id
      user_id
      parent_id
      content
    )a

    required_attrs = ~w(
      content
      user_id
      topic_id
    )a

    post
    |> cast(attrs, permitted_attrs)
    |> validate_required(required_attrs)
  end
end
