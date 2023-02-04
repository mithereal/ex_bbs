defmodule ApiWeb.LocationController do
  use ApiWeb, :controller

  alias Api.Accounts

  def index(conn, _) do
    render(conn, :index)
  end

  def show(conn, %{"id" => id}) do
    location = Accounts.get_location!(id)
    render(conn, :show, location: location)
  end
end
