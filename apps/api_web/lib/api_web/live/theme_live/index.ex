defmodule ApiWeb.ThemeLive.Index do
  use ApiWeb, :live_view

  alias Api.Database
  alias Api.Database.Theme

  @impl true
  def mount(_params, _session, socket) do
    {:ok, assign(socket, :themes, list_themes())}
  end

  @impl true
  def handle_params(params, _url, socket) do
    {:noreply, apply_action(socket, socket.assigns.live_action, params)}
  end

  defp apply_action(socket, :edit, %{"id" => id}) do
    socket
    |> assign(:page_title, "Edit Theme")
    |> assign(:theme, Database.get_theme!(id))
  end

  defp apply_action(socket, :new, _params) do
    socket
    |> assign(:page_title, "New Theme")
    |> assign(:theme, %Theme{})
  end

  defp apply_action(socket, :index, _params) do
    socket
    |> assign(:page_title, "Listing Themes")
    |> assign(:theme, nil)
  end

  @impl true
  def handle_event("delete", %{"id" => id}, socket) do
    theme = Database.get_theme!(id)
    {:ok, _} = Database.delete_theme(theme)

    {:noreply, assign(socket, :themes, list_themes())}
  end

  defp list_themes do
    Database.list_themes()
  end
end
