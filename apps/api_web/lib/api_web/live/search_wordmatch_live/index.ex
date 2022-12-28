defmodule ApiWeb.SearchWordmatchLive.Index do
  use ApiWeb, :live_view

  alias Api.Database
  alias Api.Database.SearchWordmatch

  @impl true
  def mount(_params, _session, socket) do
    {:ok, assign(socket, :search_wordmatch_collection, list_search_wordmatch())}
  end

  @impl true
  def handle_params(params, _url, socket) do
    {:noreply, apply_action(socket, socket.assigns.live_action, params)}
  end

  defp apply_action(socket, :edit, %{"id" => id}) do
    socket
    |> assign(:page_title, "Edit Search wordmatch")
    |> assign(:search_wordmatch, Database.get_search_wordmatch!(id))
  end

  defp apply_action(socket, :new, _params) do
    socket
    |> assign(:page_title, "New Search wordmatch")
    |> assign(:search_wordmatch, %SearchWordmatch{})
  end

  defp apply_action(socket, :index, _params) do
    socket
    |> assign(:page_title, "Listing Search wordmatch")
    |> assign(:search_wordmatch, nil)
  end

  @impl true
  def handle_event("delete", %{"id" => id}, socket) do
    search_wordmatch = Database.get_search_wordmatch!(id)
    {:ok, _} = Database.delete_search_wordmatch(search_wordmatch)

    {:noreply, assign(socket, :search_wordmatch_collection, list_search_wordmatch())}
  end

  defp list_search_wordmatch do
    Database.list_search_wordmatch()
  end
end
