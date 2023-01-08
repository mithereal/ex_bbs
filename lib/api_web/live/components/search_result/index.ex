defmodule ApiWeb.SearchResultLive.Index do
  use ApiWeb, :live_view

  alias Api.Bbs.Schema
  alias Api.Bbs.Schema.SearchResult

  @impl true
  def mount(_params, _session, socket) do
    {:ok, assign(socket, :search_results, list_search_results())}
  end

  @impl true
  def handle_params(params, _url, socket) do
    {:noreply, apply_action(socket, socket.assigns.live_action, params)}
  end

  defp apply_action(socket, :edit, %{"id" => id}) do
    socket
    |> assign(:page_title, "Edit Search result")
    |> assign(:search_result, Database.get_search_result!(id))
  end

  defp apply_action(socket, :new, _params) do
    socket
    |> assign(:page_title, "New Search result")
    |> assign(:search_result, %SearchResult{})
  end

  defp apply_action(socket, :index, _params) do
    socket
    |> assign(:page_title, "Listing Search results")
    |> assign(:search_result, nil)
  end

  @impl true
  def handle_event("delete", %{"id" => id}, socket) do
    search_result = Database.get_search_result!(id)
    {:ok, _} = Database.delete_search_result(search_result)

    {:noreply, assign(socket, :search_results, list_search_results())}
  end

  defp list_search_results do
    Database.list_search_results()
  end
end
