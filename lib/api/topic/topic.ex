defmodule Api.Topics.Topic do
  use Api.Schema
  import Ecto.{Changeset, Query}
  import EctoEnum, only: [defenum: 3]

  alias Api.Repo
  alias Api.Forum.Forums
  alias Api.Forum.Posts
  alias Api.Forum.Topic
  alias Api.Forum.Categories
  alias Api.Accounts.User
  alias Api.Stars.Star
  alias Api.Collections.Collection

  alias Api.Forum.Topics.TitleSlug
  alias Api.System.Status

  defenum(TopicType, :topic_type, [
    :normal,
    :featured
  ])

  schema "bbs_topics" do
    field :description, :string
    field :title, :string
    field :type, TopicType
    field :closed_at, :naive_datetime
    field :replied_at, :naive_datetime
    field :suggested_at, :naive_datetime
    field :reply_count, :integer, default: 0
    field :visit_count, :integer, default: 0
    field :star_count, :integer, default: 0

    belongs_to :status, Status, foreign_key: :status_id
    belongs_to :forums, Forums,  foreign_key: :forum_id
    has_many :posts, Posts, foreign_key: :post_id
    belongs_to :users, User, foreign_key: :user_id
    belongs_to :categories, Categories, foreign_key: :category_id
    belongs_to :last_reply, Posts, foreign_key: :last_reply_id
    belongs_to :last_reply_user, User, foreign_key: :last_reply_user_id
    has_many :replies, Posts
    has_many :stars, Star
    has_many :collections, Collection, on_delete: :delete_all


    field :slug, TitleSlug.Type

    timestamps()
  end

  @doc false
  def changeset(topics, attrs) do
    topics
    |> cast(attrs, [ :title, :description])
    |> cast_assoc(:posts,  required: false, with: &Posts.changeset/2)
    |> put_assoc(:forums, attrs.forum)
    |> put_assoc(:status, attrs.status)
    |> put_assoc(:users, attrs.user)
    |> unique_constraint(:title)
    |> TitleSlug.maybe_generate_slug()
    |> TitleSlug.unique_constraint()
    |> validate_required([ :title, :description])
  end


  @doc """
  Filters the featured of topics.
  """
  @spec featured(Ecto.Queryable.t()) :: Ecto.Query.t()
  def featured(query \\ __MODULE__),
      do: where(query, [..., t], t.type == ^:featured)


  @doc """
  Filters the no_reply of topics.
  """
  @spec no_reply(Ecto.Queryable.t()) :: Ecto.Query.t()
  def no_reply(query \\ __MODULE__),
      do: where(query, [..., t], t.reply_count == 0)

  @doc """
  Filters the popular of topics.
  """
  @spec popular(Ecto.Queryable.t()) :: Ecto.Query.t()
  def popular(query \\ __MODULE__),
      do: where(query, [..., t], t.reply_count >= 10)

  @doc """
  Filters the category of topics.
  """
  @spec by_category(Ecto.Queryable.t(), Category.t()) :: Ecto.Query.t()
  def by_category(query \\ __MODULE__, %Category{id: category_id}),
      do: where(query, [..., t], t.category_id == ^category_id)

  @doc """
  Filters the user of topics.
  """
  @spec by_user(Ecto.Queryable.t(), User.t()) :: Ecto.Query.t()
  def by_user(query \\ __MODULE__, %User{id: user_id}),
      do: where(query, [..., t], t.user_id == ^user_id)

  @doc """
  Filters the user of topics.
  """
  @spec by_user_ids(Ecto.Queryable.t(), List.t()) :: Ecto.Query.t()
  def by_user_ids(query \\ __MODULE__, list),
      do: where(query, [..., t], t.user_id in ^list)

  @doc """
  Returns nearly 10 topics
  """
  @spec recent(t()) :: t()
  def recent(query \\ __MODULE__),
      do: from(t in query, order_by: [desc: t.updated_at], limit: 10)

  @doc """
  Returns the default sort of the topic list, according to suggested_at && updated_at
  """
  @spec base_order(t()) :: t()
  def base_order(query \\ __MODULE__),
      do: from(t in query, order_by: [asc: t.suggested_at], order_by: [desc: t.updated_at])

  @doc """
  Preloads the user of a topic.
  """
  @spec preload_user(t()) :: t()
  def preload_user(topic), do: Repo.preload(topic, [:user, :last_reply_user])

  @doc """
  Preloads the reply of a topic.
  """
  @spec preload_replies(t()) :: t()
  def preload_replies(topic), do: Repo.preload(topic, :replies)

  @doc """
  Preloads the reply of a topic.
  """
  @spec preload_category(t()) :: t()
  def preload_category(topic), do: Repo.preload(topic, :category)

  @doc """
  Preloads all of a topic.
  """
  @spec preload_all(t()) :: t()
  def preload_all(topic) do
    topic
    |> preload_replies
    |> preload_user
    |> preload_category
  end

  @doc """
  Topic increment/decrement count
  """
  def counter(%Topic{id: topic_id}, :inc, :visit_count) do
    Topic
    |> where([..., t], t.id == ^topic_id)
    |> Repo.update_all(inc: [visit_count: 1])
  end

  def counter(%Topic{id: topic_id}, :inc, :reply_count) do
    Topic
    |> where([..., t], t.id == ^topic_id)
    |> Repo.update_all(inc: [reply_count: 1])
  end

  def counter(%Topic{id: topic_id}, :dec, :reply_count) do
    Topic
    |> where([..., t], t.id == ^topic_id)
    |> Repo.update_all(inc: [reply_count: -1])
  end

  @doc false
  def changeset(topic, attrs) do
    permitted_attrs = ~w(
      title
      body
      closed_at
      user_id
      type
      category_id
      visit_count
      reply_count
      star_count
      last_reply_id
      last_reply_user_id
      replied_at
      suggested_at
    )a

    required_attrs = ~w(
      title
      body
      category_id
      user_id
    )a

    topic
    |> cast(attrs, permitted_attrs)
    |> validate_required(required_attrs)
  end
  end