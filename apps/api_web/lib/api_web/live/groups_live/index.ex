defmodule ApiWeb.GroupsLive.Index do
  use ApiWeb, :live_view

  alias Api.Bbs.Schema
  alias Api.Bbs.Schema.Groups

  @impl true
  def mount(_params, _session, socket) do
    {:ok, assign(socket, :group, list_group())}
  end

  @impl true
  def handle_params(params, _url, socket) do
    {:noreply, apply_action(socket, socket.assigns.live_action, params)}
  end

  defp apply_action(socket, :edit, %{"id" => id}) do
    socket
    |> assign(:page_title, "Edit Groups")
    |> assign(:groups, Database.get_groups!(id))
  end

  defp apply_action(socket, :new, _params) do
    socket
    |> assign(:page_title, "New Groups")
    |> assign(:groups, %Groups{})
  end

  defp apply_action(socket, :index, _params) do
    socket
    |> assign(:page_title, "Listing Group")
    |> assign(:groups, nil)
  end

  @impl true
  def handle_event("delete", %{"id" => id}, socket) do
    groups = Database.get_groups!(id)
    {:ok, _} = Database.delete_groups(groups)

    {:noreply, assign(socket, :group, list_group())}
  end

  defp list_group do
    Database.list_group()
  end
end
