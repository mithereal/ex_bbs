defmodule ApiWeb.CategoriesController do
  use ApiWeb, :controller

  alias Api.Forum
  alias Api.Forum.Categories

  def index(conn, _params) do
    categories = Forum.list_categories()
    render(conn, "index.html", categories: categories)
  end

  def new(conn, _params) do
    changeset = Forum.change_categories(%Categories{})
    render(conn, "new.html", changeset: changeset)
  end

  def create(conn, %{"categories" => categories_params}) do
    case Forum.create_categories(categories_params) do
      {:ok, categories} ->
        conn
        |> put_flash(:info, "Categories created successfully.")
        |> redirect(to: Routes.categories_path(conn, :show, categories))

      {:error, %Ecto.Changeset{} = changeset} ->
        render(conn, "new.html", changeset: changeset)
    end
  end

  def show(conn, %{"id" => id}) do
    categories = Forum.get_categories!(id)
    render(conn, "show.html", categories: categories)
  end

  def edit(conn, %{"id" => id}) do
    categories = Forum.get_categories!(id)
    changeset = Forum.change_categories(categories)
    render(conn, "edit.html", categories: categories, changeset: changeset)
  end

  def update(conn, %{"id" => id, "categories" => categories_params}) do
    categories = Forum.get_categories!(id)

    case Forum.update_categories(categories, categories_params) do
      {:ok, categories} ->
        conn
        |> put_flash(:info, "Categories updated successfully.")
        |> redirect(to: Routes.categories_path(conn, :show, categories))

      {:error, %Ecto.Changeset{} = changeset} ->
        render(conn, "edit.html", categories: categories, changeset: changeset)
    end
  end

  def delete(conn, %{"id" => id}) do
    categories = Forum.get_categories!(id)
    {:ok, _categories} = Forum.delete_categories(categories)

    conn
    |> put_flash(:info, "Categories deleted successfully.")
    |> redirect(to: Routes.categories_path(conn, :index))
  end
end
