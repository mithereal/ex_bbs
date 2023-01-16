defmodule ApiWeb.RoleController do
  use ApiWeb, :controller

  alias Api.Terminator
  alias Api.Terminator.Role

  def index(conn, _params) do
    roles = Terminator.list_roles()
    render(conn, "index.html", roles: roles)
  end

  def new(conn, _params) do
    changeset = Terminator.change_role(%Role{})
    render(conn, "new.html", changeset: changeset)
  end

  def create(conn, %{"role" => role_params}) do
    case Terminator.create_role(role_params) do
      {:ok, role} ->
        conn
        |> put_flash(:info, "Role created successfully.")
        |> redirect(to: Routes.role_path(conn, :show, role))

      {:error, %Ecto.Changeset{} = changeset} ->
        render(conn, "new.html", changeset: changeset)
    end
  end

  def show(conn, %{"id" => id}) do
    role = Terminator.get_role!(id)
    render(conn, "show.html", role: role)
  end

  def edit(conn, %{"id" => id}) do
    role = Terminator.get_role!(id)
    changeset = Terminator.change_role(role)
    render(conn, "edit.html", role: role, changeset: changeset)
  end

  def update(conn, %{"id" => id, "role" => role_params}) do
    role = Terminator.get_role!(id)

    case Terminator.update_role(role, role_params) do
      {:ok, role} ->
        conn
        |> put_flash(:info, "Role updated successfully.")
        |> redirect(to: Routes.role_path(conn, :show, role))

      {:error, %Ecto.Changeset{} = changeset} ->
        render(conn, "edit.html", role: role, changeset: changeset)
    end
  end

  def delete(conn, %{"id" => id}) do
    role = Terminator.get_role!(id)
    {:ok, _role} = Terminator.delete_role(role)

    conn
    |> put_flash(:info, "Role deleted successfully.")
    |> redirect(to: Routes.role_path(conn, :index))
  end
end
