defmodule ApiWeb.PageController do
  use ApiWeb, :controller
  use Breadcrumble

  alias Api.Pages
  alias Api.Pages.Page

  plug :add_breadcrumb, name: 'top', url: '/'

  def privacy(conn, _params) do
    page = Pages.get_page_by_slug("privacy")
    render(conn, "privacy.html", page: page)
  end

  def terms(conn, _params) do
    page = Pages.get_page_by_slug("terms")
    render(conn, "terms.html", page: page)
  end

  def faq(conn, _params) do
    page = Pages.get_page_by_slug("faq")
    render(conn, "faq.html", page: page)
  end

  def contact(conn, _params) do
    page = Pages.get_page_by_slug("contact")
    render(conn, "contact.html", page: page)
  end

  def index(conn, _params) do
    pages = Pages.list_pages()
    render(conn, "index.html", pages: pages)
  end

  def new(conn, _params) do
    changeset = Pages.change_page(%Page{})
    render(conn, "new.html", changeset: changeset)
  end

  def create(conn, %{"page" => page_params}) do
    case Pages.create_page(page_params) do
      {:ok, page} ->
        conn
        |> put_flash(:info, "Page created successfully.")
        |> redirect(to: Routes.page_path(conn, :show, page))

      {:error, %Ecto.Changeset{} = changeset} ->
        render(conn, "new.html", changeset: changeset)
    end
  end

  def show(conn, %{"id" => id}) do
    page = Pages.get_page!(id)
    render(conn, "show.html", page: page)
  end

  def edit(conn, %{"id" => id}) do
    page = Pages.get_page!(id)
    changeset = Pages.change_page(page)
    render(conn, "edit.html", page: page, changeset: changeset)
  end

  def update(conn, %{"id" => id, "page" => page_params}) do
    page = Pages.get_page!(id)

    case Pages.update_page(page, page_params) do
      {:ok, page} ->
        conn
        |> put_flash(:info, "Page updated successfully.")
        |> redirect(to: Routes.page_path(conn, :show, page))

      {:error, %Ecto.Changeset{} = changeset} ->
        render(conn, "edit.html", page: page, changeset: changeset)
    end
  end

  def delete(conn, %{"id" => id}) do
    page = Pages.get_page!(id)
    {:ok, _page} = Pages.delete_page(page)

    conn
    |> put_flash(:info, "Page deleted successfully.")
    |> redirect(to: Routes.page_path(conn, :index))
  end

  def front_page(conn, _) do
    render(conn, "front_page.html")
    end

  def pwa(conn, _) do
    meta_attrs = [
      %{name: "og:title", content: "Websockets PWA"},
      %{name: "og:image", content: "/images/websockets_512.png"},
      %{name: "og:description", content: "Data-Twister Client PWA"},
      %{name: "description", content: "Data-Twister Websockets Client PWA"}
    ]

    conn =
      conn
      |> assign(:meta_attrs, meta_attrs)
      |> assign(:page_title, "Application")
      |> assign(:manifest, "/pwa.json")

    render(conn, "pwa.html")
  end
end
