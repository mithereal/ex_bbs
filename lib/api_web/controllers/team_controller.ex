defmodule ApiWeb.TeamController do
  use ApiWeb, :controller

  alias Api.{Accounts, Topics}
  alias Topics.Queries

  def index(conn, _params) do
    render(conn, :index)
  end

  def show(conn, %{"id" => id} = params) do
    team = Accounts.get_team!(id)
    team_user_ids = Enum.map(team.users, & &1.id)

    result =
      [user_ids: team_user_ids]
      |> Queries.cond_topics()
      |> Turbo.Ecto.turbo(params)

    render(conn, :show,
      team: team,
      topics: result.datas,
      paginate: result.paginate
    )
  end

  def people(conn, %{"id" => id}) do
    team = Accounts.get_team!(id)
    render(conn, :people, team: team)
  end
end
