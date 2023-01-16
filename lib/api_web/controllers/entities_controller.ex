defmodule ApiWeb.EntitiesController do
  use ApiWeb, :controller

  alias Api.Terminator
  alias Api.Terminator.Entities

  def index(conn, _params) do
    entities = Terminator.list_entities()
    render(conn, "index.html", entities: entities)
  end

  def new(conn, _params) do
    changeset = Terminator.change_entities(%Entities{})
    render(conn, "new.html", changeset: changeset)
  end

  def create(conn, %{"entities" => entities_params}) do
    case Terminator.create_entities(entities_params) do
      {:ok, entities} ->
        conn
        |> put_flash(:info, "Entities created successfully.")
        |> redirect(to: Routes.entities_path(conn, :show, entities))

      {:error, %Ecto.Changeset{} = changeset} ->
        render(conn, "new.html", changeset: changeset)
    end
  end

  def show(conn, %{"id" => id}) do
    entities = Terminator.get_entities!(id)
    render(conn, "show.html", entities: entities)
  end

  def edit(conn, %{"id" => id}) do
    entities = Terminator.get_entities!(id)
    changeset = Terminator.change_entities(entities)
    render(conn, "edit.html", entities: entities, changeset: changeset)
  end

  def update(conn, %{"id" => id, "entities" => entities_params}) do
    entities = Terminator.get_entities!(id)

    case Terminator.update_entities(entities, entities_params) do
      {:ok, entities} ->
        conn
        |> put_flash(:info, "Entities updated successfully.")
        |> redirect(to: Routes.entities_path(conn, :show, entities))

      {:error, %Ecto.Changeset{} = changeset} ->
        render(conn, "edit.html", entities: entities, changeset: changeset)
    end
  end

  def delete(conn, %{"id" => id}) do
    entities = Terminator.get_entities!(id)
    {:ok, _entities} = Terminator.delete_entities(entities)

    conn
    |> put_flash(:info, "Entities deleted successfully.")
    |> redirect(to: Routes.entities_path(conn, :index))
  end
end
