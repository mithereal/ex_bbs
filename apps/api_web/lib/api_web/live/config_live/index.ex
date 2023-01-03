defmodule ApiWeb.ConfigLive.Index do
  use ApiWeb, :live_view

  alias Api.Bbs.Schema
  alias Api.Bbs.Schema.Config

  @impl true
  def mount(_params, _session, socket) do
    {:ok, assign(socket, :config_collection, list_config())}
  end

  @impl true
  def handle_params(params, _url, socket) do
    {:noreply, apply_action(socket, socket.assigns.live_action, params)}
  end

  defp apply_action(socket, :edit, %{"id" => id}) do
    socket
    |> assign(:page_title, "Edit Config")
    |> assign(:config, Database.get_config!(id))
  end

  defp apply_action(socket, :new, _params) do
    socket
    |> assign(:page_title, "New Config")
    |> assign(:config, %Config{})
  end

  defp apply_action(socket, :index, _params) do
    socket
    |> assign(:page_title, "Listing Config")
    |> assign(:config, nil)
  end

  @impl true
  def handle_event("delete", %{"id" => id}, socket) do
    config = Database.get_config!(id)
    {:ok, _} = Database.delete_config(config)

    {:noreply, assign(socket, :config_collection, list_config())}
  end

  defp list_config do
    Database.list_config()
  end
end
