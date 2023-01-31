defmodule Api.Stars.Star do
  @moduledoc false

  use Ecto.Schema
  import Ecto.{Changeset, Query}

  alias Api.{
    Repo,
    Topics.Topic,
    Replies.Reply,
    Accounts.User,
    Stars.Star
  }

  @type t :: %Star{}

  schema "stars" do
    belongs_to :reply, Reply
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
  Filters the reply by star.
  """
  @spec by_reply(Ecto.Queryable.t(), Reply.t()) :: Ecto.Query.t()
  def by_reply(query \\ __MODULE__, %Reply{id: reply_id}),
    do: from(s in query, where: s.reply_id == ^reply_id)

  @doc """
  Preloads the reply of a topic.
  """
  @spec preload_reply(t()) :: t()
  def preload_reply(star), do: Repo.preload(star, :reply)

  @doc """
  Preloads the reply of a topic.
  """
  @spec preload_topic(t()) :: t()
  def preload_topic(star), do: Repo.preload(star, :topic)

  @doc false
  def changeset(star, attrs) do
    permitted_attrs = ~w(
      user_id
      reply_id
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
