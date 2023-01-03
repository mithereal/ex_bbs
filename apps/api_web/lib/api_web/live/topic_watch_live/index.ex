defmodule ApiWeb.TopicWatchLive.Index do
  use ApiWeb, :live_view

  alias Api.Bbs.Schema
  alias Api.Bbs.Schema.TopicWatch

  @impl true
  def mount(_params, _session, socket) do
    {:ok, assign(socket, :topics_watch, list_topics_watch())}
  end

  @impl true
  def handle_params(params, _url, socket) do
    {:noreply, apply_action(socket, socket.assigns.live_action, params)}
  end

  defp apply_action(socket, :edit, %{"id" => id}) do
    socket
    |> assign(:page_title, "Edit Topic watch")
    |> assign(:topic_watch, Database.get_topic_watch!(id))
  end

  defp apply_action(socket, :new, _params) do
    socket
    |> assign(:page_title, "New Topic watch")
    |> assign(:topic_watch, %TopicWatch{})
  end

  defp apply_action(socket, :index, _params) do
    socket
    |> assign(:page_title, "Listing Topics watch")
    |> assign(:topic_watch, nil)
  end

  @impl true
  def handle_event("delete", %{"id" => id}, socket) do
    topic_watch = Database.get_topic_watch!(id)
    {:ok, _} = Database.delete_topic_watch(topic_watch)

    {:noreply, assign(socket, :topics_watch, list_topics_watch())}
  end

  defp list_topics_watch do
    Database.list_topics_watch()
  end
end
