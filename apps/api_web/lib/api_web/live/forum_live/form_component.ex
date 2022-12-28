defmodule ApiWeb.ForumLive.FormComponent do
  use ApiWeb, :live_component

  alias Api.Database

  @impl true
  def update(%{forum: forum} = assigns, socket) do
    changeset = Database.change_forum(forum)

    {:ok,
     socket
     |> assign(assigns)
     |> assign(:changeset, changeset)}
  end

  @impl true
  def handle_event("validate", %{"forum" => forum_params}, socket) do
    changeset =
      socket.assigns.forum
      |> Database.change_forum(forum_params)
      |> Map.put(:action, :validate)

    {:noreply, assign(socket, :changeset, changeset)}
  end

  def handle_event("save", %{"forum" => forum_params}, socket) do
    save_forum(socket, socket.assigns.action, forum_params)
  end

  defp save_forum(socket, :edit, forum_params) do
    case Database.update_forum(socket.assigns.forum, forum_params) do
      {:ok, _forum} ->
        {:noreply,
         socket
         |> put_flash(:info, "Forum updated successfully")
         |> push_redirect(to: socket.assigns.return_to)}

      {:error, %Ecto.Changeset{} = changeset} ->
        {:noreply, assign(socket, :changeset, changeset)}
    end
  end

  defp save_forum(socket, :new, forum_params) do
    case Database.create_forum(forum_params) do
      {:ok, _forum} ->
        {:noreply,
         socket
         |> put_flash(:info, "Forum created successfully")
         |> push_redirect(to: socket.assigns.return_to)}

      {:error, %Ecto.Changeset{} = changeset} ->
        {:noreply, assign(socket, changeset: changeset)}
    end
  end
end
