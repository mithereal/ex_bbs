defmodule ApiWeb.DisallowLive.Index do
  use ApiWeb, :live_view

  alias Api.Bbs.Schema
  alias Api.Bbs.Schema.Disallow

  @impl true
  def mount(_params, _session, socket) do
    {:ok, assign(socket, :disallow_collection, list_disallow())}
  end

  @impl true
  def handle_params(params, _url, socket) do
    {:noreply, apply_action(socket, socket.assigns.live_action, params)}
  end

  defp apply_action(socket, :edit, %{"id" => id}) do
    socket
    |> assign(:page_title, "Edit Disallow")
    |> assign(:disallow, Database.get_disallow!(id))
  end

  defp apply_action(socket, :new, _params) do
    socket
    |> assign(:page_title, "New Disallow")
    |> assign(:disallow, %Disallow{})
  end

  defp apply_action(socket, :index, _params) do
    socket
    |> assign(:page_title, "Listing Disallow")
    |> assign(:disallow, nil)
  end

  @impl true
  def handle_event("delete", %{"id" => id}, socket) do
    disallow = Database.get_disallow!(id)
    {:ok, _} = Database.delete_disallow(disallow)

    {:noreply, assign(socket, :disallow_collection, list_disallow())}
  end

  defp list_disallow do
    Database.list_disallow()
  end
end
