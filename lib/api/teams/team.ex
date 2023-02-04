defmodule Api.Team do
  @moduledoc false

  use Api.Schema
  import Ecto.Changeset
  alias Api.Accounts.{User, Team, UserTeam}

  alias Api.Teams.TitleSlug

  @type t :: %Team{}

  schema "teams" do
    field :name, :string

    field :avatar, :string
    field :summary, :string

    belongs_to :owner, User
    field :slug, TitleSlug.Type

    many_to_many :users, User, join_through: UserTeam

    timestamps()
  end

  @doc false
  def changeset(team, attrs) do
    team
    |> cast(attrs, [:owner_id, :github_handle, :name, :summary, :avatar])
    |> validate_required([:owner_id, :github_handle, :name, :summary, :avatar])
    |> TitleSlug.maybe_generate_slug()
    |> TitleSlug.unique_constraint()
  end
end
