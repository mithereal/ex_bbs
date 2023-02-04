defmodule ApiWeb.CompanyController do
  use ApiWeb, :controller

  def action(conn, _) do
    render(conn, action_name(conn))
  end
end
