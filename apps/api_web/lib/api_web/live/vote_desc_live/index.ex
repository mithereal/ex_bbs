defmodule ApiWeb.VoteDescLive.Index do
  use ApiWeb, :live_view

  alias Api.Database
  alias Api.Database.VoteDesc

  @impl true
  def mount(_params, _session, socket) do
    {:ok, assign(socket, :vote_desc_collection, list_vote_desc())}
  end

  @impl true
  def handle_params(params, _url, socket) do
    {:noreply, apply_action(socket, socket.assigns.live_action, params)}
  end

  defp apply_action(socket, :edit, %{"id" => id}) do
    socket
    |> assign(:page_title, "Edit Vote desc")
    |> assign(:vote_desc, Database.get_vote_desc!(id))
  end

  defp apply_action(socket, :new, _params) do
    socket
    |> assign(:page_title, "New Vote desc")
    |> assign(:vote_desc, %VoteDesc{})
  end

  defp apply_action(socket, :index, _params) do
    socket
    |> assign(:page_title, "Listing Vote desc")
    |> assign(:vote_desc, nil)
  end

  @impl true
  def handle_event("delete", %{"id" => id}, socket) do
    vote_desc = Database.get_vote_desc!(id)
    {:ok, _} = Database.delete_vote_desc(vote_desc)

    {:noreply, assign(socket, :vote_desc_collection, list_vote_desc())}
  end

  defp list_vote_desc do
    Database.list_vote_desc()
  end
end
