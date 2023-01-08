defmodule ApiWeb.VoteResultLive.Index do
  use ApiWeb, :live_view

  alias Api.Bbs.Schema
  alias Api.Bbs.Schema.VoteResult

  @impl true
  def mount(_params, _session, socket) do
    {:ok, assign(socket, :vote_results, list_vote_results())}
  end

  @impl true
  def handle_params(params, _url, socket) do
    {:noreply, apply_action(socket, socket.assigns.live_action, params)}
  end

  defp apply_action(socket, :edit, %{"id" => id}) do
    socket
    |> assign(:page_title, "Edit Vote result")
    |> assign(:vote_result, Database.get_vote_result!(id))
  end

  defp apply_action(socket, :new, _params) do
    socket
    |> assign(:page_title, "New Vote result")
    |> assign(:vote_result, %VoteResult{})
  end

  defp apply_action(socket, :index, _params) do
    socket
    |> assign(:page_title, "Listing Vote results")
    |> assign(:vote_result, nil)
  end

  @impl true
  def handle_event("delete", %{"id" => id}, socket) do
    vote_result = Database.get_vote_result!(id)
    {:ok, _} = Database.delete_vote_result(vote_result)

    {:noreply, assign(socket, :vote_results, list_vote_results())}
  end

  defp list_vote_results do
    Database.list_vote_results()
  end
end
