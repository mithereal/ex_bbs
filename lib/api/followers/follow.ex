defmodule Api.Followers.Follow do
  @moduledoc false

  use Ecto.Schema
  import Ecto.{Changeset, Query}

  alias Api.{
    Repo,
    Accounts.User,
    Followers.Follow
  }

  @type t :: %Follow{}

  schema "bbs_followers" do
    belongs_to :user, User
    belongs_to :follower, User, foreign_key: :follower_id

    timestamps()
  end

  @doc """
  Filters the follows by follower.
  """
  @spec by_follower(Ecto.Queryable.t(), User.t()) :: Ecto.Query.t()
  def by_follower(query \\ __MODULE__, %User{id: follower_id}),
    do: from(f in query, where: f.follower_id == ^follower_id)

  @doc """
  Filters the follows by followed user.
  """
  @spec by_user(Ecto.Queryable.t(), User.t()) :: Ecto.Query.t()
  def by_user(query \\ __MODULE__, %User{id: user_id}),
    do: from(f in query, where: f.user_id == ^user_id)

  @doc """
  Preloads the user of a topic.
  """
  @spec preload_user(t()) :: t()
  def preload_user(follow), do: Repo.preload(follow, [:user])

  @doc false
  def changeset(follow, attrs) do
    permitted_attrs = ~w(
      user_id
      follower_id
    )a

    required_attrs = ~w(
      user_id
      follower_id
    )a

    follow
    |> cast(attrs, permitted_attrs)
    |> validate_required(required_attrs)
  end
end
