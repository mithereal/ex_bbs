defmodule ApiWeb.ThemeNameLive.Index do
  use ApiWeb, :live_view

  alias Api.Bbs.Schema
  alias Api.Bbs.Schema.ThemeName

  @impl true
  def mount(_params, _session, socket) do
    {:ok, assign(socket, :themes_name, list_themes_name())}
  end

  @impl true
  def handle_params(params, _url, socket) do
    {:noreply, apply_action(socket, socket.assigns.live_action, params)}
  end

  defp apply_action(socket, :edit, %{"id" => id}) do
    socket
    |> assign(:page_title, "Edit Theme name")
    |> assign(:theme_name, Database.get_theme_name!(id))
  end

  defp apply_action(socket, :new, _params) do
    socket
    |> assign(:page_title, "New Theme name")
    |> assign(:theme_name, %ThemeName{})
  end

  defp apply_action(socket, :index, _params) do
    socket
    |> assign(:page_title, "Listing Themes name")
    |> assign(:theme_name, nil)
  end

  @impl true
  def handle_event("delete", %{"id" => id}, socket) do
    theme_name = Database.get_theme_name!(id)
    {:ok, _} = Database.delete_theme_name(theme_name)

    {:noreply, assign(socket, :themes_name, list_themes_name())}
  end

  defp list_themes_name do
    Database.list_themes_name()
  end
end
