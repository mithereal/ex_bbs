defmodule ApiWeb.RankLive.Index do
  use ApiWeb, :live_view

  alias Api.Database
  alias Api.Database.Rank

  @impl true
  def mount(_params, _session, socket) do
    {:ok, assign(socket, :ranks, list_ranks())}
  end

  @impl true
  def handle_params(params, _url, socket) do
    {:noreply, apply_action(socket, socket.assigns.live_action, params)}
  end

  defp apply_action(socket, :edit, %{"id" => id}) do
    socket
    |> assign(:page_title, "Edit Rank")
    |> assign(:rank, Database.get_rank!(id))
  end

  defp apply_action(socket, :new, _params) do
    socket
    |> assign(:page_title, "New Rank")
    |> assign(:rank, %Rank{})
  end

  defp apply_action(socket, :index, _params) do
    socket
    |> assign(:page_title, "Listing Ranks")
    |> assign(:rank, nil)
  end

  @impl true
  def handle_event("delete", %{"id" => id}, socket) do
    rank = Database.get_rank!(id)
    {:ok, _} = Database.delete_rank(rank)

    {:noreply, assign(socket, :ranks, list_ranks())}
  end

  defp list_ranks do
    Database.list_ranks()
  end
end
