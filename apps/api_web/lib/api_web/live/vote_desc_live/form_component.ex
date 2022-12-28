defmodule ApiWeb.VoteDescLive.FormComponent do
  use ApiWeb, :live_component

  alias Api.Database

  @impl true
  def update(%{vote_desc: vote_desc} = assigns, socket) do
    changeset = Database.change_vote_desc(vote_desc)

    {:ok,
     socket
     |> assign(assigns)
     |> assign(:changeset, changeset)}
  end

  @impl true
  def handle_event("validate", %{"vote_desc" => vote_desc_params}, socket) do
    changeset =
      socket.assigns.vote_desc
      |> Database.change_vote_desc(vote_desc_params)
      |> Map.put(:action, :validate)

    {:noreply, assign(socket, :changeset, changeset)}
  end

  def handle_event("save", %{"vote_desc" => vote_desc_params}, socket) do
    save_vote_desc(socket, socket.assigns.action, vote_desc_params)
  end

  defp save_vote_desc(socket, :edit, vote_desc_params) do
    case Database.update_vote_desc(socket.assigns.vote_desc, vote_desc_params) do
      {:ok, _vote_desc} ->
        {:noreply,
         socket
         |> put_flash(:info, "Vote desc updated successfully")
         |> push_redirect(to: socket.assigns.return_to)}

      {:error, %Ecto.Changeset{} = changeset} ->
        {:noreply, assign(socket, :changeset, changeset)}
    end
  end

  defp save_vote_desc(socket, :new, vote_desc_params) do
    case Database.create_vote_desc(vote_desc_params) do
      {:ok, _vote_desc} ->
        {:noreply,
         socket
         |> put_flash(:info, "Vote desc created successfully")
         |> push_redirect(to: socket.assigns.return_to)}

      {:error, %Ecto.Changeset{} = changeset} ->
        {:noreply, assign(socket, changeset: changeset)}
    end
  end
end
