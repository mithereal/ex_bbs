defmodule ApiWeb.DisallowLive.FormComponent do
  use ApiWeb, :live_component

  alias Api.Database

  @impl true
  def update(%{disallow: disallow} = assigns, socket) do
    changeset = Database.change_disallow(disallow)

    {:ok,
     socket
     |> assign(assigns)
     |> assign(:changeset, changeset)}
  end

  @impl true
  def handle_event("validate", %{"disallow" => disallow_params}, socket) do
    changeset =
      socket.assigns.disallow
      |> Database.change_disallow(disallow_params)
      |> Map.put(:action, :validate)

    {:noreply, assign(socket, :changeset, changeset)}
  end

  def handle_event("save", %{"disallow" => disallow_params}, socket) do
    save_disallow(socket, socket.assigns.action, disallow_params)
  end

  defp save_disallow(socket, :edit, disallow_params) do
    case Database.update_disallow(socket.assigns.disallow, disallow_params) do
      {:ok, _disallow} ->
        {:noreply,
         socket
         |> put_flash(:info, "Disallow updated successfully")
         |> push_redirect(to: socket.assigns.return_to)}

      {:error, %Ecto.Changeset{} = changeset} ->
        {:noreply, assign(socket, :changeset, changeset)}
    end
  end

  defp save_disallow(socket, :new, disallow_params) do
    case Database.create_disallow(disallow_params) do
      {:ok, _disallow} ->
        {:noreply,
         socket
         |> put_flash(:info, "Disallow created successfully")
         |> push_redirect(to: socket.assigns.return_to)}

      {:error, %Ecto.Changeset{} = changeset} ->
        {:noreply, assign(socket, changeset: changeset)}
    end
  end
end
