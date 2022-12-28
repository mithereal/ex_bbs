defmodule ApiWeb.ForumPruneLive.FormComponent do
  use ApiWeb, :live_component

  alias Api.Database

  @impl true
  def update(%{forum_prune: forum_prune} = assigns, socket) do
    changeset = Database.change_forum_prune(forum_prune)

    {:ok,
     socket
     |> assign(assigns)
     |> assign(:changeset, changeset)}
  end

  @impl true
  def handle_event("validate", %{"forum_prune" => forum_prune_params}, socket) do
    changeset =
      socket.assigns.forum_prune
      |> Database.change_forum_prune(forum_prune_params)
      |> Map.put(:action, :validate)

    {:noreply, assign(socket, :changeset, changeset)}
  end

  def handle_event("save", %{"forum_prune" => forum_prune_params}, socket) do
    save_forum_prune(socket, socket.assigns.action, forum_prune_params)
  end

  defp save_forum_prune(socket, :edit, forum_prune_params) do
    case Database.update_forum_prune(socket.assigns.forum_prune, forum_prune_params) do
      {:ok, _forum_prune} ->
        {:noreply,
         socket
         |> put_flash(:info, "Forum prune updated successfully")
         |> push_redirect(to: socket.assigns.return_to)}

      {:error, %Ecto.Changeset{} = changeset} ->
        {:noreply, assign(socket, :changeset, changeset)}
    end
  end

  defp save_forum_prune(socket, :new, forum_prune_params) do
    case Database.create_forum_prune(forum_prune_params) do
      {:ok, _forum_prune} ->
        {:noreply,
         socket
         |> put_flash(:info, "Forum prune created successfully")
         |> push_redirect(to: socket.assigns.return_to)}

      {:error, %Ecto.Changeset{} = changeset} ->
        {:noreply, assign(socket, changeset: changeset)}
    end
  end
end
