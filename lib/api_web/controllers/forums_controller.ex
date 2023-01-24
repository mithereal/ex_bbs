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


  alias Api.Forum
  alias Atomex.{Feed, Entry}

  def forum_rss(conn, params) do
    topic = Map.get(params, :forum_slug) || ""
    posts = Forum.get_forum(topic) ## list posts by topic
    feed = build_feed(posts, conn, :thread_rss)

    conn
    |> put_resp_content_type("text/xml")
    |> send_resp(200, feed)
  end

  def rss(conn, params) do
    number = Map.get(params, :forums_count) || 10
    posts = Forum.list_forums(number)
    feed = build_feed(posts, conn)

    conn
    |> put_resp_content_type("text/xml")
    |> send_resp(200, feed)
  end

  def build_feed(posts, conn, path \\ :rss) do
    Feed.new(Routes.forums_path(conn, :index), DateTime.utc_now,  ApiWeb.Endpoint.host() <> " RSS")
    |> Feed.author(ApiWeb.Endpoint.host(), email: "no-reply@" <> ApiWeb.Endpoint.host())
    |> Feed.link(Routes.forums_path(conn, path), rel: "self")
    |> Feed.entries(Enum.map(posts, &get_entry(conn, &1)))
    |> Feed.build()
    |> Atomex.generate_document()
  end

  defp get_entry(conn, %{title: name, slug: slug, description: summary, inserted_at: published_at}) do
    Entry.new(Routes.forums_url(conn, :show, slug), DateTime.from_naive!(published_at, "Etc/UTC"), name)
    |> Entry.link(Routes.forums_url(conn, :show, slug))
    |> Entry.author(ApiWeb.Endpoint.host())
    |> Entry.content(summary, type: "text")
    |> Entry.build()
  end
end
