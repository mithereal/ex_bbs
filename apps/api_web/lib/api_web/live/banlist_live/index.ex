defmodule ApiWeb.BanlistLive.Index do
  use ApiWeb, :live_view

  alias Api.Database
  alias Api.Database.Banlist

  @impl true
  def mount(_params, _session, socket) do
    {:ok, assign(socket, :banlist_collection, list_banlist())}
  end

  @impl true
  def handle_params(params, _url, socket) do
    {:noreply, apply_action(socket, socket.assigns.live_action, params)}
  end

  defp apply_action(socket, :edit, %{"id" => id}) do
    socket
    |> assign(:page_title, "Edit Banlist")
    |> assign(:banlist, Database.get_banlist!(id))
  end

  defp apply_action(socket, :new, _params) do
    socket
    |> assign(:page_title, "New Banlist")
    |> assign(:banlist, %Banlist{})
  end

  defp apply_action(socket, :index, _params) do
    socket
    |> assign(:page_title, "Listing Banlist")
    |> assign(:banlist, nil)
  end

  @impl true
  def handle_event("delete", %{"id" => id}, socket) do
    banlist = Database.get_banlist!(id)
    {:ok, _} = Database.delete_banlist(banlist)

    {:noreply, assign(socket, :banlist_collection, list_banlist())}
  end

  defp list_banlist do
    Database.list_banlist()
  end
end
