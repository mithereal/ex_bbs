defmodule ApiWeb.UserGroupLive.Index do
  use ApiWeb, :live_view

  alias Api.Database
  alias Api.Database.UserGroup

  @impl true
  def mount(_params, _session, socket) do
    {:ok, assign(socket, :user_group_collection, list_user_group())}
  end

  @impl true
  def handle_params(params, _url, socket) do
    {:noreply, apply_action(socket, socket.assigns.live_action, params)}
  end

  defp apply_action(socket, :edit, %{"id" => id}) do
    socket
    |> assign(:page_title, "Edit User group")
    |> assign(:user_group, Database.get_user_group!(id))
  end

  defp apply_action(socket, :new, _params) do
    socket
    |> assign(:page_title, "New User group")
    |> assign(:user_group, %UserGroup{})
  end

  defp apply_action(socket, :index, _params) do
    socket
    |> assign(:page_title, "Listing User group")
    |> assign(:user_group, nil)
  end

  @impl true
  def handle_event("delete", %{"id" => id}, socket) do
    user_group = Database.get_user_group!(id)
    {:ok, _} = Database.delete_user_group(user_group)

    {:noreply, assign(socket, :user_group_collection, list_user_group())}
  end

  defp list_user_group do
    Database.list_user_group()
  end
end
