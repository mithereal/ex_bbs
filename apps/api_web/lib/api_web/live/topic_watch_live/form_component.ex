defmodule ApiWeb.TopicWatchLive.FormComponent do
  use ApiWeb, :live_component

  alias Api.Database

  @impl true
  def update(%{topic_watch: topic_watch} = assigns, socket) do
    changeset = Database.change_topic_watch(topic_watch)

    {:ok,
     socket
     |> assign(assigns)
     |> assign(:changeset, changeset)}
  end

  @impl true
  def handle_event("validate", %{"topic_watch" => topic_watch_params}, socket) do
    changeset =
      socket.assigns.topic_watch
      |> Database.change_topic_watch(topic_watch_params)
      |> Map.put(:action, :validate)

    {:noreply, assign(socket, :changeset, changeset)}
  end

  def handle_event("save", %{"topic_watch" => topic_watch_params}, socket) do
    save_topic_watch(socket, socket.assigns.action, topic_watch_params)
  end

  defp save_topic_watch(socket, :edit, topic_watch_params) do
    case Database.update_topic_watch(socket.assigns.topic_watch, topic_watch_params) do
      {:ok, _topic_watch} ->
        {:noreply,
         socket
         |> put_flash(:info, "Topic watch updated successfully")
         |> push_redirect(to: socket.assigns.return_to)}

      {:error, %Ecto.Changeset{} = changeset} ->
        {:noreply, assign(socket, :changeset, changeset)}
    end
  end

  defp save_topic_watch(socket, :new, topic_watch_params) do
    case Database.create_topic_watch(topic_watch_params) do
      {:ok, _topic_watch} ->
        {:noreply,
         socket
         |> put_flash(:info, "Topic watch created successfully")
         |> push_redirect(to: socket.assigns.return_to)}

      {:error, %Ecto.Changeset{} = changeset} ->
        {:noreply, assign(socket, changeset: changeset)}
    end
  end
end
