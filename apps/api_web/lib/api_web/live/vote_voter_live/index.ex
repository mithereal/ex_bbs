defmodule ApiWeb.VoteVoterLive.Index do
  use ApiWeb, :live_view

  alias Api.Database
  alias Api.Database.VoteVoter

  @impl true
  def mount(_params, _session, socket) do
    {:ok, assign(socket, :vote_voters, list_vote_voters())}
  end

  @impl true
  def handle_params(params, _url, socket) do
    {:noreply, apply_action(socket, socket.assigns.live_action, params)}
  end

  defp apply_action(socket, :edit, %{"id" => id}) do
    socket
    |> assign(:page_title, "Edit Vote voter")
    |> assign(:vote_voter, Database.get_vote_voter!(id))
  end

  defp apply_action(socket, :new, _params) do
    socket
    |> assign(:page_title, "New Vote voter")
    |> assign(:vote_voter, %VoteVoter{})
  end

  defp apply_action(socket, :index, _params) do
    socket
    |> assign(:page_title, "Listing Vote voters")
    |> assign(:vote_voter, nil)
  end

  @impl true
  def handle_event("delete", %{"id" => id}, socket) do
    vote_voter = Database.get_vote_voter!(id)
    {:ok, _} = Database.delete_vote_voter(vote_voter)

    {:noreply, assign(socket, :vote_voters, list_vote_voters())}
  end

  defp list_vote_voters do
    Database.list_vote_voters()
  end
end
