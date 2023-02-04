defmodule Api.Accounts.UserTeam do
  @moduledoc false

  use Ecto.Schema
  import Ecto.Changeset
  alias Api.Accounts.{User, Team}

  schema "users_teams" do
    field :role, :string
    field :status, :string

    belongs_to :team, Team
    belongs_to :user, User

    timestamps()
  end

  @doc false
  def changeset(user_team, attrs) do
    user_team
    |> cast(attrs, [:user_id, :team_id])
    |> validate_required([:user_id, :team_id])
  end
end
