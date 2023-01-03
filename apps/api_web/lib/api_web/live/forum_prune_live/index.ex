defmodule ApiWeb.ForumPruneLive.Index do
  use ApiWeb, :live_view

  alias Api.Bbs.Schema
  alias Api.Bbs.Schema.ForumPrune

  @impl true
  def mount(_params, _session, socket) do
    {:ok, assign(socket, :forum_prune_collection, list_forum_prune())}
  end

  @impl true
  def handle_params(params, _url, socket) do
    {:noreply, apply_action(socket, socket.assigns.live_action, params)}
  end

  defp apply_action(socket, :edit, %{"id" => id}) do
    socket
    |> assign(:page_title, "Edit Forum prune")
    |> assign(:forum_prune, Database.get_forum_prune!(id))
  end

  defp apply_action(socket, :new, _params) do
    socket
    |> assign(:page_title, "New Forum prune")
    |> assign(:forum_prune, %ForumPrune{})
  end

  defp apply_action(socket, :index, _params) do
    socket
    |> assign(:page_title, "Listing Forum prune")
    |> assign(:forum_prune, nil)
  end

  @impl true
  def handle_event("delete", %{"id" => id}, socket) do
    forum_prune = Database.get_forum_prune!(id)
    {:ok, _} = Database.delete_forum_prune(forum_prune)

    {:noreply, assign(socket, :forum_prune_collection, list_forum_prune())}
  end

  defp list_forum_prune do
    Database.list_forum_prune()
  end
end
