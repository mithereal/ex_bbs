defmodule ApiWeb.PostTextLive.FormComponent do
  use ApiWeb, :live_component

  alias Api.Bbs.Schema

  @impl true
  def update(%{post_text: post_text} = assigns, socket) do
    changeset = Database.change_post_text(post_text)

    {:ok,
     socket
     |> assign(assigns)
     |> assign(:changeset, changeset)}
  end

  @impl true
  def handle_event("validate", %{"post_text" => post_text_params}, socket) do
    changeset =
      socket.assigns.post_text
      |> Database.change_post_text(post_text_params)
      |> Map.put(:action, :validate)

    {:noreply, assign(socket, :changeset, changeset)}
  end

  def handle_event("save", %{"post_text" => post_text_params}, socket) do
    save_post_text(socket, socket.assigns.action, post_text_params)
  end

  defp save_post_text(socket, :edit, post_text_params) do
    case Database.update_post_text(socket.assigns.post_text, post_text_params) do
      {:ok, _post_text} ->
        {:noreply,
         socket
         |> put_flash(:info, "Post text updated successfully")
         |> push_redirect(to: socket.assigns.return_to)}

      {:error, %Ecto.Changeset{} = changeset} ->
        {:noreply, assign(socket, :changeset, changeset)}
    end
  end

  defp save_post_text(socket, :new, post_text_params) do
    case Database.create_post_text(post_text_params) do
      {:ok, _post_text} ->
        {:noreply,
         socket
         |> put_flash(:info, "Post text created successfully")
         |> push_redirect(to: socket.assigns.return_to)}

      {:error, %Ecto.Changeset{} = changeset} ->
        {:noreply, assign(socket, changeset: changeset)}
    end
  end
end
