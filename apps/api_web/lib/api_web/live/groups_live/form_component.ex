defmodule ApiWeb.GroupsLive.FormComponent do
  use ApiWeb, :live_component

  alias Api.Bbs.Schema

  @impl true
  def update(%{groups: groups} = assigns, socket) do
    changeset = Database.change_groups(groups)

    {:ok,
     socket
     |> assign(assigns)
     |> assign(:changeset, changeset)}
  end

  @impl true
  def handle_event("validate", %{"groups" => groups_params}, socket) do
    changeset =
      socket.assigns.groups
      |> Database.change_groups(groups_params)
      |> Map.put(:action, :validate)

    {:noreply, assign(socket, :changeset, changeset)}
  end

  def handle_event("save", %{"groups" => groups_params}, socket) do
    save_groups(socket, socket.assigns.action, groups_params)
  end

  defp save_groups(socket, :edit, groups_params) do
    case Database.update_groups(socket.assigns.groups, groups_params) do
      {:ok, _groups} ->
        {:noreply,
         socket
         |> put_flash(:info, "Groups updated successfully")
         |> push_redirect(to: socket.assigns.return_to)}

      {:error, %Ecto.Changeset{} = changeset} ->
        {:noreply, assign(socket, :changeset, changeset)}
    end
  end

  defp save_groups(socket, :new, groups_params) do
    case Database.create_groups(groups_params) do
      {:ok, _groups} ->
        {:noreply,
         socket
         |> put_flash(:info, "Groups created successfully")
         |> push_redirect(to: socket.assigns.return_to)}

      {:error, %Ecto.Changeset{} = changeset} ->
        {:noreply, assign(socket, changeset: changeset)}
    end
  end
end
