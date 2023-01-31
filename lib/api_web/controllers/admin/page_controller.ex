defmodule postWeb.Admin.PageController do
  use postWeb, :controller

  def index(conn, _) do
    render(conn, :index)
  end
end
