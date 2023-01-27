defmodule ApiWeb.SearchController do
  use ApiWeb, :controller


  def index(conn, params) do
    render(conn, "index.html")
  end

end
