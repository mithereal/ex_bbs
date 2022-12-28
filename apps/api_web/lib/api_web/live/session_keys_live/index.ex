defmodule ApiWeb.SessionKeysLive.Index do
  use ApiWeb, :live_view

  alias Api.Database
  alias Api.Database.SessionKeys

  @impl true
  def mount(_params, _session, socket) do
    {:ok, assign(socket, :sessions_keys, list_sessions_keys())}
  end

  @impl true
  def handle_params(params, _url, socket) do
    {:noreply, apply_action(socket, socket.assigns.live_action, params)}
  end

  defp apply_action(socket, :edit, %{"id" => id}) do
    socket
    |> assign(:page_title, "Edit Session keys")
    |> assign(:session_keys, Database.get_session_keys!(id))
  end

  defp apply_action(socket, :new, _params) do
    socket
    |> assign(:page_title, "New Session keys")
    |> assign(:session_keys, %SessionKeys{})
  end

  defp apply_action(socket, :index, _params) do
    socket
    |> assign(:page_title, "Listing Sessions keys")
    |> assign(:session_keys, nil)
  end

  @impl true
  def handle_event("delete", %{"id" => id}, socket) do
    session_keys = Database.get_session_keys!(id)
    {:ok, _} = Database.delete_session_keys(session_keys)

    {:noreply, assign(socket, :sessions_keys, list_sessions_keys())}
  end

  defp list_sessions_keys do
    Database.list_sessions_keys()
  end
end
