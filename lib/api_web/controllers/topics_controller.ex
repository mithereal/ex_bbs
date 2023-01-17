defmodule ApiWeb.TopicsController do
  use ApiWeb, :controller

  alias Api.Forum
  alias Api.Forum.Topics

  def index(conn, _params) do
    topics = Forum.list_topics()
    render(conn, "index.html", topics: topics)
  end

  def new(conn, _params) do
    changeset = Forum.change_topics(%Topics{})
    render(conn, "new.html", changeset: changeset)
  end

  def create(conn, %{"topics" => topics_params}) do
    case Forum.create_topics(topics_params) do
      {:ok, topics} ->
        conn
        |> put_flash(:info, "Topics created successfully.")
        |> redirect(to: Routes.topics_path(conn, :show, topics))

      {:error, %Ecto.Changeset{} = changeset} ->
        render(conn, "new.html", changeset: changeset)
    end
  end

  def show(conn, %{"id" => id}) do
    topics = Forum.get_topics!(id)
    render(conn, "show.html", topics: topics)
  end

  def edit(conn, %{"id" => id}) do
    topics = Forum.get_topics!(id)
    changeset = Forum.change_topics(topics)
    render(conn, "edit.html", topics: topics, changeset: changeset)
  end

  def update(conn, %{"id" => id, "topics" => topics_params}) do
    topics = Forum.get_topics!(id)

    case Forum.update_topics(topics, topics_params) do
      {:ok, topics} ->
        conn
        |> put_flash(:info, "Topics updated successfully.")
        |> redirect(to: Routes.topics_path(conn, :show, topics))

      {:error, %Ecto.Changeset{} = changeset} ->
        render(conn, "edit.html", topics: topics, changeset: changeset)
    end
  end

  def delete(conn, %{"id" => id}) do
    topics = Forum.get_topics!(id)
    {:ok, _topics} = Forum.delete_topics(topics)

    conn
    |> put_flash(:info, "Topics deleted successfully.")
    |> redirect(to: Routes.topics_path(conn, :index))
  end
end
