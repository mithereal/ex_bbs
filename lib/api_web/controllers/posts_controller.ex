defmodule ApiWeb.PostsController do
  use ApiWeb, :controller

  alias Api.Forum
  alias Api.Forum.Posts

  def index(conn, _params) do
    posts = Forum.list_posts()
    render(conn, "index.html", posts: posts)
  end

  def new(conn, _params) do
    changeset = Forum.change_posts(%Posts{})
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

  def show(conn, %{"id" => id}) do
    posts = Forum.get_posts!(id)
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
end
