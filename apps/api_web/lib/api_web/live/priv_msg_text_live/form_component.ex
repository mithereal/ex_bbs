defmodule ApiWeb.PrivMsgTextLive.FormComponent do
  use ApiWeb, :live_component

  alias Api.Database

  @impl true
  def update(%{priv_msg_text: priv_msg_text} = assigns, socket) do
    changeset = Database.change_priv_msg_text(priv_msg_text)

    {:ok,
     socket
     |> assign(assigns)
     |> assign(:changeset, changeset)}
  end

  @impl true
  def handle_event("validate", %{"priv_msg_text" => priv_msg_text_params}, socket) do
    changeset =
      socket.assigns.priv_msg_text
      |> Database.change_priv_msg_text(priv_msg_text_params)
      |> Map.put(:action, :validate)

    {:noreply, assign(socket, :changeset, changeset)}
  end

  def handle_event("save", %{"priv_msg_text" => priv_msg_text_params}, socket) do
    save_priv_msg_text(socket, socket.assigns.action, priv_msg_text_params)
  end

  defp save_priv_msg_text(socket, :edit, priv_msg_text_params) do
    case Database.update_priv_msg_text(socket.assigns.priv_msg_text, priv_msg_text_params) do
      {:ok, _priv_msg_text} ->
        {:noreply,
         socket
         |> put_flash(:info, "Priv msg text updated successfully")
         |> push_redirect(to: socket.assigns.return_to)}

      {:error, %Ecto.Changeset{} = changeset} ->
        {:noreply, assign(socket, :changeset, changeset)}
    end
  end

  defp save_priv_msg_text(socket, :new, priv_msg_text_params) do
    case Database.create_priv_msg_text(priv_msg_text_params) do
      {:ok, _priv_msg_text} ->
        {:noreply,
         socket
         |> put_flash(:info, "Priv msg text created successfully")
         |> push_redirect(to: socket.assigns.return_to)}

      {:error, %Ecto.Changeset{} = changeset} ->
        {:noreply, assign(socket, changeset: changeset)}
    end
  end
end
