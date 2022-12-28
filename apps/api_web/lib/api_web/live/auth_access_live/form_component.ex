defmodule ApiWeb.AuthAccessLive.FormComponent do
  use ApiWeb, :live_component

  alias Api.Database

  @impl true
  def update(%{auth_access: auth_access} = assigns, socket) do
    changeset = Database.change_auth_access(auth_access)

    {:ok,
     socket
     |> assign(assigns)
     |> assign(:changeset, changeset)}
  end

  @impl true
  def handle_event("validate", %{"auth_access" => auth_access_params}, socket) do
    changeset =
      socket.assigns.auth_access
      |> Database.change_auth_access(auth_access_params)
      |> Map.put(:action, :validate)

    {:noreply, assign(socket, :changeset, changeset)}
  end

  def handle_event("save", %{"auth_access" => auth_access_params}, socket) do
    save_auth_access(socket, socket.assigns.action, auth_access_params)
  end

  defp save_auth_access(socket, :edit, auth_access_params) do
    case Database.update_auth_access(socket.assigns.auth_access, auth_access_params) do
      {:ok, _auth_access} ->
        {:noreply,
         socket
         |> put_flash(:info, "Auth access updated successfully")
         |> push_redirect(to: socket.assigns.return_to)}

      {:error, %Ecto.Changeset{} = changeset} ->
        {:noreply, assign(socket, :changeset, changeset)}
    end
  end

  defp save_auth_access(socket, :new, auth_access_params) do
    case Database.create_auth_access(auth_access_params) do
      {:ok, _auth_access} ->
        {:noreply,
         socket
         |> put_flash(:info, "Auth access created successfully")
         |> push_redirect(to: socket.assigns.return_to)}

      {:error, %Ecto.Changeset{} = changeset} ->
        {:noreply, assign(socket, changeset: changeset)}
    end
  end
end
