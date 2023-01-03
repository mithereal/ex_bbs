defmodule ApiWeb.VoteVoterLive.FormComponent do
  use ApiWeb, :live_component

  alias Api.Bbs.Schema

  @impl true
  def update(%{vote_voter: vote_voter} = assigns, socket) do
    changeset = Database.change_vote_voter(vote_voter)

    {:ok,
     socket
     |> assign(assigns)
     |> assign(:changeset, changeset)}
  end

  @impl true
  def handle_event("validate", %{"vote_voter" => vote_voter_params}, socket) do
    changeset =
      socket.assigns.vote_voter
      |> Database.change_vote_voter(vote_voter_params)
      |> Map.put(:action, :validate)

    {:noreply, assign(socket, :changeset, changeset)}
  end

  def handle_event("save", %{"vote_voter" => vote_voter_params}, socket) do
    save_vote_voter(socket, socket.assigns.action, vote_voter_params)
  end

  defp save_vote_voter(socket, :edit, vote_voter_params) do
    case Database.update_vote_voter(socket.assigns.vote_voter, vote_voter_params) do
      {:ok, _vote_voter} ->
        {:noreply,
         socket
         |> put_flash(:info, "Vote voter updated successfully")
         |> push_redirect(to: socket.assigns.return_to)}

      {:error, %Ecto.Changeset{} = changeset} ->
        {:noreply, assign(socket, :changeset, changeset)}
    end
  end

  defp save_vote_voter(socket, :new, vote_voter_params) do
    case Database.create_vote_voter(vote_voter_params) do
      {:ok, _vote_voter} ->
        {:noreply,
         socket
         |> put_flash(:info, "Vote voter created successfully")
         |> push_redirect(to: socket.assigns.return_to)}

      {:error, %Ecto.Changeset{} = changeset} ->
        {:noreply, assign(socket, changeset: changeset)}
    end
  end
end
