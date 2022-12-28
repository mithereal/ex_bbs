defmodule ApiWeb.PostTextLive.Index do
  use ApiWeb, :live_view

  alias Api.Database
  alias Api.Database.PostText

  @impl true
  def mount(_params, _session, socket) do
    {:ok, assign(socket, :posts_text, list_posts_text())}
  end

  @impl true
  def handle_params(params, _url, socket) do
    {:noreply, apply_action(socket, socket.assigns.live_action, params)}
  end

  defp apply_action(socket, :edit, %{"id" => id}) do
    socket
    |> assign(:page_title, "Edit Post text")
    |> assign(:post_text, Database.get_post_text!(id))
  end

  defp apply_action(socket, :new, _params) do
    socket
    |> assign(:page_title, "New Post text")
    |> assign(:post_text, %PostText{})
  end

  defp apply_action(socket, :index, _params) do
    socket
    |> assign(:page_title, "Listing Posts text")
    |> assign(:post_text, nil)
  end

  @impl true
  def handle_event("delete", %{"id" => id}, socket) do
    post_text = Database.get_post_text!(id)
    {:ok, _} = Database.delete_post_text(post_text)

    {:noreply, assign(socket, :posts_text, list_posts_text())}
  end

  defp list_posts_text do
    Database.list_posts_text()
  end
end
