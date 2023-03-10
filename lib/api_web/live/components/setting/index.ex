defmodule ApiWeb.SettingLive.Index do
  use ApiWeb, :live_view

  alias Api.System
  alias Api.System.Setting

  @impl true
  def mount(_params, _session, socket) do
    {:ok, assign(socket, :settings, list_settings())}
  end

  @impl true
  def handle_params(params, _url, socket) do
    {:noreply, apply_action(socket, socket.assigns.live_action, params)}
  end

  defp apply_action(socket, :edit, %{"id" => id}) do
    socket
    |> assign(:page_title, "Edit Setting")
    |> assign(:setting, System.get_setting!(id))
  end

  defp apply_action(socket, :new, _params) do
    socket
    |> assign(:page_title, "New Setting")
    |> assign(:setting, %Setting{})
  end

  defp apply_action(socket, :index, _params) do
    socket
    |> assign(:page_title, "Listing Settings")
    |> assign(:setting, nil)
  end

  @impl true
  def handle_event("delete", %{"id" => id}, socket) do
    setting = System.get_setting!(id)
    {:ok, _} = System.delete_setting(setting)

    {:noreply, assign(socket, :settings, list_settings())}
  end

  defp list_settings do
    System.list_settings()
  end
end
