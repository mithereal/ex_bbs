defmodule ApiWeb.SessionKeysLive.FormComponent do
  use ApiWeb, :live_component

  alias Api.Bbs.Schema

  @impl true
  def update(%{session_keys: session_keys} = assigns, socket) do
    changeset = Database.change_session_keys(session_keys)

    {:ok,
     socket
     |> assign(assigns)
     |> assign(:changeset, changeset)}
  end

  @impl true
  def handle_event("validate", %{"session_keys" => session_keys_params}, socket) do
    changeset =
      socket.assigns.session_keys
      |> Database.change_session_keys(session_keys_params)
      |> Map.put(:action, :validate)

    {:noreply, assign(socket, :changeset, changeset)}
  end

  def handle_event("save", %{"session_keys" => session_keys_params}, socket) do
    save_session_keys(socket, socket.assigns.action, session_keys_params)
  end

  defp save_session_keys(socket, :edit, session_keys_params) do
    case Database.update_session_keys(socket.assigns.session_keys, session_keys_params) do
      {:ok, _session_keys} ->
        {:noreply,
         socket
         |> put_flash(:info, "Session keys updated successfully")
         |> push_redirect(to: socket.assigns.return_to)}

      {:error, %Ecto.Changeset{} = changeset} ->
        {:noreply, assign(socket, :changeset, changeset)}
    end
  end

  defp save_session_keys(socket, :new, session_keys_params) do
    case Database.create_session_keys(session_keys_params) do
      {:ok, _session_keys} ->
        {:noreply,
         socket
         |> put_flash(:info, "Session keys created successfully")
         |> push_redirect(to: socket.assigns.return_to)}

      {:error, %Ecto.Changeset{} = changeset} ->
        {:noreply, assign(socket, changeset: changeset)}
    end
  end
end
