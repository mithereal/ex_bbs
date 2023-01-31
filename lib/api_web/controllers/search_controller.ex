defmodule ApiWeb.SearchController do
  use ApiWeb, :controller
  use Breadcrumble

  plug :add_breadcrumb, name: 'top', url: '/'

  def index(conn, params) do
    render(conn, "index.html")
  end

  @doc """
  Filters the mention users.
  """
  def users(conn, params) do
    users =
      conn
      |> current_user()
      |> Accounts.search_mention_user(params["q"])
      |> Enum.map(&%{login: &1.username, avatar_url: &1.avatar})

    json(conn, users)
  end
end
