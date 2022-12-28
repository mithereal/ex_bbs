defmodule ApiWeb.RankLive.FormComponent do
  use ApiWeb, :live_component

  alias Api.Database

  @impl true
  def update(%{rank: rank} = assigns, socket) do
    changeset = Database.change_rank(rank)

    {:ok,
     socket
     |> assign(assigns)
     |> assign(:changeset, changeset)}
  end

  @impl true
  def handle_event("validate", %{"rank" => rank_params}, socket) do
    changeset =
      socket.assigns.rank
      |> Database.change_rank(rank_params)
      |> Map.put(:action, :validate)

    {:noreply, assign(socket, :changeset, changeset)}
  end

  def handle_event("save", %{"rank" => rank_params}, socket) do
    save_rank(socket, socket.assigns.action, rank_params)
  end

  defp save_rank(socket, :edit, rank_params) do
    case Database.update_rank(socket.assigns.rank, rank_params) do
      {:ok, _rank} ->
        {:noreply,
         socket
         |> put_flash(:info, "Rank updated successfully")
         |> push_redirect(to: socket.assigns.return_to)}

      {:error, %Ecto.Changeset{} = changeset} ->
        {:noreply, assign(socket, :changeset, changeset)}
    end
  end

  defp save_rank(socket, :new, rank_params) do
    case Database.create_rank(rank_params) do
      {:ok, _rank} ->
        {:noreply,
         socket
         |> put_flash(:info, "Rank created successfully")
         |> push_redirect(to: socket.assigns.return_to)}

      {:error, %Ecto.Changeset{} = changeset} ->
        {:noreply, assign(socket, changeset: changeset)}
    end
  end
end
