defmodule ApiWeb.SessionLive.Index do
  use ApiWeb, :live_view

  alias Api.Database
  alias Api.Database.Session

  @impl true
  def mount(_params, _session, socket) do
    {:ok, assign(socket, :sessions, list_sessions())}
  end

  @impl true
  def handle_params(params, _url, socket) do
    {:noreply, apply_action(socket, socket.assigns.live_action, params)}
  end

  defp apply_action(socket, :edit, %{"id" => id}) do
    socket
    |> assign(:page_title, "Edit Session")
    |> assign(:session, Database.get_session!(id))
  end

  defp apply_action(socket, :new, _params) do
    socket
    |> assign(:page_title, "New Session")
    |> assign(:session, %Session{})
  end

  defp apply_action(socket, :index, _params) do
    socket
    |> assign(:page_title, "Listing Sessions")
    |> assign(:session, nil)
  end

  @impl true
  def handle_event("delete", %{"id" => id}, socket) do
    session = Database.get_session!(id)
    {:ok, _} = Database.delete_session(session)

    {:noreply, assign(socket, :sessions, list_sessions())}
  end

  defp list_sessions do
    Database.list_sessions()
  end
end
