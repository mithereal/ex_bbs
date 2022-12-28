defmodule ApiWeb.VoteResultLive.FormComponent do
  use ApiWeb, :live_component

  alias Api.Database

  @impl true
  def update(%{vote_result: vote_result} = assigns, socket) do
    changeset = Database.change_vote_result(vote_result)

    {:ok,
     socket
     |> assign(assigns)
     |> assign(:changeset, changeset)}
  end

  @impl true
  def handle_event("validate", %{"vote_result" => vote_result_params}, socket) do
    changeset =
      socket.assigns.vote_result
      |> Database.change_vote_result(vote_result_params)
      |> Map.put(:action, :validate)

    {:noreply, assign(socket, :changeset, changeset)}
  end

  def handle_event("save", %{"vote_result" => vote_result_params}, socket) do
    save_vote_result(socket, socket.assigns.action, vote_result_params)
  end

  defp save_vote_result(socket, :edit, vote_result_params) do
    case Database.update_vote_result(socket.assigns.vote_result, vote_result_params) do
      {:ok, _vote_result} ->
        {:noreply,
         socket
         |> put_flash(:info, "Vote result updated successfully")
         |> push_redirect(to: socket.assigns.return_to)}

      {:error, %Ecto.Changeset{} = changeset} ->
        {:noreply, assign(socket, :changeset, changeset)}
    end
  end

  defp save_vote_result(socket, :new, vote_result_params) do
    case Database.create_vote_result(vote_result_params) do
      {:ok, _vote_result} ->
        {:noreply,
         socket
         |> put_flash(:info, "Vote result created successfully")
         |> push_redirect(to: socket.assigns.return_to)}

      {:error, %Ecto.Changeset{} = changeset} ->
        {:noreply, assign(socket, changeset: changeset)}
    end
  end
end
