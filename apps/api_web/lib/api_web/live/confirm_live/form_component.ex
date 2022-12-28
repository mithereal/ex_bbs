defmodule ApiWeb.ConfirmLive.FormComponent do
  use ApiWeb, :live_component

  alias Api.Database

  @impl true
  def update(%{confirm: confirm} = assigns, socket) do
    changeset = Database.change_confirm(confirm)

    {:ok,
     socket
     |> assign(assigns)
     |> assign(:changeset, changeset)}
  end

  @impl true
  def handle_event("validate", %{"confirm" => confirm_params}, socket) do
    changeset =
      socket.assigns.confirm
      |> Database.change_confirm(confirm_params)
      |> Map.put(:action, :validate)

    {:noreply, assign(socket, :changeset, changeset)}
  end

  def handle_event("save", %{"confirm" => confirm_params}, socket) do
    save_confirm(socket, socket.assigns.action, confirm_params)
  end

  defp save_confirm(socket, :edit, confirm_params) do
    case Database.update_confirm(socket.assigns.confirm, confirm_params) do
      {:ok, _confirm} ->
        {:noreply,
         socket
         |> put_flash(:info, "Confirm updated successfully")
         |> push_redirect(to: socket.assigns.return_to)}

      {:error, %Ecto.Changeset{} = changeset} ->
        {:noreply, assign(socket, :changeset, changeset)}
    end
  end

  defp save_confirm(socket, :new, confirm_params) do
    case Database.create_confirm(confirm_params) do
      {:ok, _confirm} ->
        {:noreply,
         socket
         |> put_flash(:info, "Confirm created successfully")
         |> push_redirect(to: socket.assigns.return_to)}

      {:error, %Ecto.Changeset{} = changeset} ->
        {:noreply, assign(socket, changeset: changeset)}
    end
  end
end
