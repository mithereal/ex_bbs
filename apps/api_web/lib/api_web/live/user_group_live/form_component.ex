defmodule ApiWeb.UserGroupLive.FormComponent do
  use ApiWeb, :live_component

  alias Api.Database

  @impl true
  def update(%{user_group: user_group} = assigns, socket) do
    changeset = Database.change_user_group(user_group)

    {:ok,
     socket
     |> assign(assigns)
     |> assign(:changeset, changeset)}
  end

  @impl true
  def handle_event("validate", %{"user_group" => user_group_params}, socket) do
    changeset =
      socket.assigns.user_group
      |> Database.change_user_group(user_group_params)
      |> Map.put(:action, :validate)

    {:noreply, assign(socket, :changeset, changeset)}
  end

  def handle_event("save", %{"user_group" => user_group_params}, socket) do
    save_user_group(socket, socket.assigns.action, user_group_params)
  end

  defp save_user_group(socket, :edit, user_group_params) do
    case Database.update_user_group(socket.assigns.user_group, user_group_params) do
      {:ok, _user_group} ->
        {:noreply,
         socket
         |> put_flash(:info, "User group updated successfully")
         |> push_redirect(to: socket.assigns.return_to)}

      {:error, %Ecto.Changeset{} = changeset} ->
        {:noreply, assign(socket, :changeset, changeset)}
    end
  end

  defp save_user_group(socket, :new, user_group_params) do
    case Database.create_user_group(user_group_params) do
      {:ok, _user_group} ->
        {:noreply,
         socket
         |> put_flash(:info, "User group created successfully")
         |> push_redirect(to: socket.assigns.return_to)}

      {:error, %Ecto.Changeset{} = changeset} ->
        {:noreply, assign(socket, changeset: changeset)}
    end
  end
end
