defmodule ApiWeb.ForumsController do
  use ApiWeb, :controller

  alias Api.Forum
  alias Api.Forum.Forums

  def index(conn, _params) do
    forums = Forum.list_forums()
    render(conn, "index.html", forums: forums)
  end

  def new(conn, _params) do
    changeset = Forum.change_forums(%Forums{})
    render(conn, "new.html", changeset: changeset)
  end

  def create(conn, %{"forums" => forums_params}) do
    case Forum.create_forums(forums_params) do
      {:ok, forums} ->
        conn
        |> put_flash(:info, "Forums created successfully.")
        |> redirect(to: Routes.forums_path(conn, :show, forums))

      {:error, %Ecto.Changeset{} = changeset} ->
        render(conn, "new.html", changeset: changeset)
    end
  end

  def show(conn, %{"id" => id}) do
    forums = Forum.get_forums!(id)
    render(conn, "show.html", forums: forums)
  end

  def edit(conn, %{"id" => id}) do
    forums = Forum.get_forums!(id)
    changeset = Forum.change_forums(forums)
    render(conn, "edit.html", forums: forums, changeset: changeset)
  end

  def update(conn, %{"id" => id, "forums" => forums_params}) do
    forums = Forum.get_forums!(id)

    case Forum.update_forums(forums, forums_params) do
      {:ok, forums} ->
        conn
        |> put_flash(:info, "Forums updated successfully.")
        |> redirect(to: Routes.forums_path(conn, :show, forums))

      {:error, %Ecto.Changeset{} = changeset} ->
        render(conn, "edit.html", forums: forums, changeset: changeset)
    end
  end

  def delete(conn, %{"id" => id}) do
    forums = Forum.get_forums!(id)
    {:ok, _forums} = Forum.delete_forums(forums)

    conn
    |> put_flash(:info, "Forums deleted successfully.")
    |> redirect(to: Routes.forums_path(conn, :index))
  end
end
