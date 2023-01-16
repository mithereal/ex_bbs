defmodule ApiWeb.PerformerController do
  use ApiWeb, :controller

  alias Api.Terminator
  alias Api.Terminator.Performer

  def index(conn, _params) do
    performers = Terminator.list_performers()
    render(conn, "index.html", performers: performers)
  end

  def new(conn, _params) do
    changeset = Terminator.change_performer(%Performer{})
    render(conn, "new.html", changeset: changeset)
  end

  def create(conn, %{"performer" => performer_params}) do
    case Terminator.create_performer(performer_params) do
      {:ok, performer} ->
        conn
        |> put_flash(:info, "Performer created successfully.")
        |> redirect(to: Routes.performer_path(conn, :show, performer))

      {:error, %Ecto.Changeset{} = changeset} ->
        render(conn, "new.html", changeset: changeset)
    end
  end

  def show(conn, %{"id" => id}) do
    performer = Terminator.get_performer!(id)
    render(conn, "show.html", performer: performer)
  end

  def edit(conn, %{"id" => id}) do
    performer = Terminator.get_performer!(id)
    changeset = Terminator.change_performer(performer)
    render(conn, "edit.html", performer: performer, changeset: changeset)
  end

  def update(conn, %{"id" => id, "performer" => performer_params}) do
    performer = Terminator.get_performer!(id)

    case Terminator.update_performer(performer, performer_params) do
      {:ok, performer} ->
        conn
        |> put_flash(:info, "Performer updated successfully.")
        |> redirect(to: Routes.performer_path(conn, :show, performer))

      {:error, %Ecto.Changeset{} = changeset} ->
        render(conn, "edit.html", performer: performer, changeset: changeset)
    end
  end

  def delete(conn, %{"id" => id}) do
    performer = Terminator.get_performer!(id)
    {:ok, _performer} = Terminator.delete_performer(performer)

    conn
    |> put_flash(:info, "Performer deleted successfully.")
    |> redirect(to: Routes.performer_path(conn, :index))
  end
end
