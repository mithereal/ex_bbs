defmodule ApiWeb.SessionLive.FormComponent do
  use ApiWeb, :live_component

  alias Api.Bbs.Schema

  @impl true
  def update(%{session: session} = assigns, socket) do
    changeset = Database.change_session(session)

    {:ok,
     socket
     |> assign(assigns)
     |> assign(:changeset, changeset)}
  end

  @impl true
  def handle_event("validate", %{"session" => session_params}, socket) do
    changeset =
      socket.assigns.session
      |> Database.change_session(session_params)
      |> Map.put(:action, :validate)

    {:noreply, assign(socket, :changeset, changeset)}
  end

  def handle_event("save", %{"session" => session_params}, socket) do
    save_session(socket, socket.assigns.action, session_params)
  end

  defp save_session(socket, :edit, session_params) do
    case Database.update_session(socket.assigns.session, session_params) do
      {:ok, _session} ->
        {:noreply,
         socket
         |> put_flash(:info, "Session updated successfully")
         |> push_redirect(to: socket.assigns.return_to)}

      {:error, %Ecto.Changeset{} = changeset} ->
        {:noreply, assign(socket, :changeset, changeset)}
    end
  end

  defp save_session(socket, :new, session_params) do
    case Database.create_session(session_params) do
      {:ok, _session} ->
        {:noreply,
         socket
         |> put_flash(:info, "Session created successfully")
         |> push_redirect(to: socket.assigns.return_to)}

      {:error, %Ecto.Changeset{} = changeset} ->
        {:noreply, assign(socket, changeset: changeset)}
    end
  end
end
