defmodule ApiWeb.AbilitiesController do
  use ApiWeb, :controller

  alias Api.Terminator
  alias Api.Terminator.Abilities

  def index(conn, _params) do
    abilities = Terminator.list_abilities()
    render(conn, "index.html", abilities: abilities)
  end

  def new(conn, _params) do
    changeset = Terminator.change_abilities(%Abilities{})
    render(conn, "new.html", changeset: changeset)
  end

  def create(conn, %{"abilities" => abilities_params}) do
    case Terminator.create_abilities(abilities_params) do
      {:ok, abilities} ->
        conn
        |> put_flash(:info, "Abilities created successfully.")
        |> redirect(to: Routes.abilities_path(conn, :show, abilities))

      {:error, %Ecto.Changeset{} = changeset} ->
        render(conn, "new.html", changeset: changeset)
    end
  end

  def show(conn, %{"id" => id}) do
    abilities = Terminator.get_abilities!(id)
    render(conn, "show.html", abilities: abilities)
  end

  def edit(conn, %{"id" => id}) do
    abilities = Terminator.get_abilities!(id)
    changeset = Terminator.change_abilities(abilities)
    render(conn, "edit.html", abilities: abilities, changeset: changeset)
  end

  def update(conn, %{"id" => id, "abilities" => abilities_params}) do
    abilities = Terminator.get_abilities!(id)

    case Terminator.update_abilities(abilities, abilities_params) do
      {:ok, abilities} ->
        conn
        |> put_flash(:info, "Abilities updated successfully.")
        |> redirect(to: Routes.abilities_path(conn, :show, abilities))

      {:error, %Ecto.Changeset{} = changeset} ->
        render(conn, "edit.html", abilities: abilities, changeset: changeset)
    end
  end

  def delete(conn, %{"id" => id}) do
    abilities = Terminator.get_abilities!(id)
    {:ok, _abilities} = Terminator.delete_abilities(abilities)

    conn
    |> put_flash(:info, "Abilities deleted successfully.")
    |> redirect(to: Routes.abilities_path(conn, :index))
  end
end
