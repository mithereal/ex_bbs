defmodule ApiWeb.ForumLive.Index do
  use ApiWeb, :live_view

  alias Api.Database
  alias Api.Database.Forum

  @impl true
  def mount(_params, _session, socket) do
    {:ok, assign(socket, :forums, list_forums())}
  end

  @impl true
  def handle_params(params, _url, socket) do
    {:noreply, apply_action(socket, socket.assigns.live_action, params)}
  end

  defp apply_action(socket, :edit, %{"id" => id}) do
    socket
    |> assign(:page_title, "Edit Forum")
    |> assign(:forum, Database.get_forum!(id))
  end

  defp apply_action(socket, :new, _params) do
    socket
    |> assign(:page_title, "New Forum")
    |> assign(:forum, %Forum{})
  end

  defp apply_action(socket, :index, _params) do
    socket
    |> assign(:page_title, "Listing Forums")
    |> assign(:forum, nil)
  end

  @impl true
  def handle_event("delete", %{"id" => id}, socket) do
    forum = Database.get_forum!(id)
    {:ok, _} = Database.delete_forum(forum)

    {:noreply, assign(socket, :forums, list_forums())}
  end

  defp list_forums do
    Database.list_forums()
  end
end
