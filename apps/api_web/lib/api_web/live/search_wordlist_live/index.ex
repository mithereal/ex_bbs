defmodule ApiWeb.SearchWordlistLive.Index do
  use ApiWeb, :live_view

  alias Api.Bbs.Schema
  alias Api.Bbs.Schema.SearchWordlist

  @impl true
  def mount(_params, _session, socket) do
    {:ok, assign(socket, :search_wordlist_collection, list_search_wordlist())}
  end

  @impl true
  def handle_params(params, _url, socket) do
    {:noreply, apply_action(socket, socket.assigns.live_action, params)}
  end

  defp apply_action(socket, :edit, %{"id" => id}) do
    socket
    |> assign(:page_title, "Edit Search wordlist")
    |> assign(:search_wordlist, Database.get_search_wordlist!(id))
  end

  defp apply_action(socket, :new, _params) do
    socket
    |> assign(:page_title, "New Search wordlist")
    |> assign(:search_wordlist, %SearchWordlist{})
  end

  defp apply_action(socket, :index, _params) do
    socket
    |> assign(:page_title, "Listing Search wordlist")
    |> assign(:search_wordlist, nil)
  end

  @impl true
  def handle_event("delete", %{"id" => id}, socket) do
    search_wordlist = Database.get_search_wordlist!(id)
    {:ok, _} = Database.delete_search_wordlist(search_wordlist)

    {:noreply, assign(socket, :search_wordlist_collection, list_search_wordlist())}
  end

  defp list_search_wordlist do
    Database.list_search_wordlist()
  end
end
