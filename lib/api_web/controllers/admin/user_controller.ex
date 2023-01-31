defmodule postWeb.Admin.UserController do
  use postWeb, :controller

  alias post.Accounts
  alias post.Accounts.Queries

  def index(conn, params) do
    result = Queries.list_users() |> Turbo.Ecto.turbo(params)
    render(conn, :index, users: result.datas, paginate: result.paginate)
  end

  def delete(conn, %{"id" => id}) do
    user = Accounts.get_user!(id)
    {:ok, _user} = Accounts.delete_user(user)

    conn
    |> put_flash(:info, "User deleted successfully.")
    |> redirect(to: admin_user_path(conn, :index))
  end
end
