defmodule ApiWeb.SearchController do
  use ApiWeb, :controller
  use Breadcrumble

  plug :add_breadcrumb, name: 'top', url: '/'

  def index(conn, params) do
    render(conn, "index.html")
  end

end
