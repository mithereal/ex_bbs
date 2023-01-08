defmodule ApiWeb.AuthAccessLive.Index do
  use ApiWeb, :live_view

  alias Api.Bbs.Schema
  alias Api.Bbs.Schema.AuthAccess

  @impl true
  def mount(_params, _session, socket) do
    {:ok, assign(socket, :auth_access_collection, list_auth_access())}
  end

  @impl true
  def handle_params(params, _url, socket) do
    {:noreply, apply_action(socket, socket.assigns.live_action, params)}
  end

  defp apply_action(socket, :edit, %{"id" => id}) do
    socket
    |> assign(:page_title, "Edit Auth access")
    |> assign(:auth_access, Database.get_auth_access!(id))
  end

  defp apply_action(socket, :new, _params) do
    socket
    |> assign(:page_title, "New Auth access")
    |> assign(:auth_access, %AuthAccess{})
  end

  defp apply_action(socket, :index, _params) do
    socket
    |> assign(:page_title, "Listing Auth access")
    |> assign(:auth_access, nil)
  end

  @impl true
  def handle_event("delete", %{"id" => id}, socket) do
    auth_access = Database.get_auth_access!(id)
    {:ok, _} = Database.delete_auth_access(auth_access)

    {:noreply, assign(socket, :auth_access_collection, list_auth_access())}
  end

  defp list_auth_access do
    Database.list_auth_access()
  end
end
