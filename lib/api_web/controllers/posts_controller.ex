defmodule ApiWeb.PostsController do
  use ApiWeb, :controller

  alias Api.Forum
  alias Api.Posts.Post

  def index(conn, _params) do
    posts = Forum.list_posts()
    render(conn, "index.html", posts: posts)
  end

  def new(conn, _params) do
    changeset = Forum.change_posts(%Post{})
    render(conn, "new.html", changeset: changeset)
  end

  def create(conn, %{"posts" => posts_params}) do
    case Forum.create_posts(posts_params) do
      {:ok, posts} ->
        conn
        |> put_flash(:info, "Posts created successfully.")
        |> redirect(to: Routes.posts_path(conn, :show, posts))

      {:error, %Ecto.Changeset{} = changeset} ->
        render(conn, "new.html", changeset: changeset)
    end
  end

  def show(conn, %{"slug" => slug}) do
    posts = Forum.get_posts(slug)
    render(conn, "show.html", posts: posts)
  end

  def edit(conn, %{"id" => id}) do
    posts = Forum.get_posts!(id)
    changeset = Forum.change_posts(posts)
    render(conn, "edit.html", posts: posts, changeset: changeset)
  end

  def update(conn, %{"id" => id, "posts" => posts_params}) do
    posts = Forum.get_posts!(id)

    case Forum.update_posts(posts, posts_params) do
      {:ok, posts} ->
        conn
        |> put_flash(:info, "Posts updated successfully.")
        |> redirect(to: Routes.posts_path(conn, :show, posts))

      {:error, %Ecto.Changeset{} = changeset} ->
        render(conn, "edit.html", posts: posts, changeset: changeset)
    end
  end

  def delete(conn, %{"id" => id}) do
    posts = Forum.get_posts!(id)
    {:ok, _posts} = Forum.delete_posts(posts)

    conn
    |> put_flash(:info, "Posts deleted successfully.")
    |> redirect(to: Routes.posts_path(conn, :index))
  end

  alias Api.Forum
  alias Atomex.{Feed, Entry}

  def rss(conn, params) do
    number = Map.get(params, :posts_count) || 10
    posts = Forum.list_posts(number)
    feed = build_feed(posts, conn)

    conn
    |> put_resp_content_type("text/xml")
    |> send_resp(200, feed)
  end

  def build_feed(posts, conn) do
    Feed.new(
      Routes.posts_path(conn, :index),
      DateTime.utc_now(),
      ApiWeb.Endpoint.host() <> " RSS"
    )
    |> Feed.author(ApiWeb.Endpoint.host(), email: "no-reply@" <> ApiWeb.Endpoint.host())
    |> Feed.link(Routes.posts_path(conn, :rss), rel: "/")
    |> Feed.entries(Enum.map(posts, &get_entry(conn, &1)))
    |> Feed.build()
    |> Atomex.generate_document()
  end

  defp get_entry(conn, %{title: name, slug: slug, description: summary, inserted_at: published_at}) do
    Entry.new(
      Routes.posts_url(conn, :show, slug),
      DateTime.from_naive!(published_at, "Etc/UTC"),
      name
    )
    |> Entry.link(Routes.posts_url(conn, :show, slug))
    |> Entry.author(ApiWeb.Endpoint.host())
    |> Entry.content(summary, type: "text")
    |> Entry.build()
  end
end
