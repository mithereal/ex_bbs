defmodule ApiWeb.PrivMsgLive.FormComponent do
  use ApiWeb, :live_component

  alias Api.Bbs.Schema

  @impl true
  def update(%{priv_msg: priv_msg} = assigns, socket) do
    changeset = Database.change_priv_msg(priv_msg)

    {:ok,
     socket
     |> assign(assigns)
     |> assign(:changeset, changeset)}
  end

  @impl true
  def handle_event("validate", %{"priv_msg" => priv_msg_params}, socket) do
    changeset =
      socket.assigns.priv_msg
      |> Database.change_priv_msg(priv_msg_params)
      |> Map.put(:action, :validate)

    {:noreply, assign(socket, :changeset, changeset)}
  end

  def handle_event("save", %{"priv_msg" => priv_msg_params}, socket) do
    save_priv_msg(socket, socket.assigns.action, priv_msg_params)
  end

  defp save_priv_msg(socket, :edit, priv_msg_params) do
    case Database.update_priv_msg(socket.assigns.priv_msg, priv_msg_params) do
      {:ok, _priv_msg} ->
        {:noreply,
         socket
         |> put_flash(:info, "Priv msg updated successfully")
         |> push_redirect(to: socket.assigns.return_to)}

      {:error, %Ecto.Changeset{} = changeset} ->
        {:noreply, assign(socket, :changeset, changeset)}
    end
  end

  defp save_priv_msg(socket, :new, priv_msg_params) do
    case Database.create_priv_msg(priv_msg_params) do
      {:ok, _priv_msg} ->
        {:noreply,
         socket
         |> put_flash(:info, "Priv msg created successfully")
         |> push_redirect(to: socket.assigns.return_to)}

      {:error, %Ecto.Changeset{} = changeset} ->
        {:noreply, assign(socket, changeset: changeset)}
    end
  end
end
