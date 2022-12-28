defmodule ApiWeb.ConfirmLive.Index do
  use ApiWeb, :live_view

  alias Api.Database
  alias Api.Database.Confirm

  @impl true
  def mount(_params, _session, socket) do
    {:ok, assign(socket, :confirm_collection, list_confirm())}
  end

  @impl true
  def handle_params(params, _url, socket) do
    {:noreply, apply_action(socket, socket.assigns.live_action, params)}
  end

  defp apply_action(socket, :edit, %{"id" => id}) do
    socket
    |> assign(:page_title, "Edit Confirm")
    |> assign(:confirm, Database.get_confirm!(id))
  end

  defp apply_action(socket, :new, _params) do
    socket
    |> assign(:page_title, "New Confirm")
    |> assign(:confirm, %Confirm{})
  end

  defp apply_action(socket, :index, _params) do
    socket
    |> assign(:page_title, "Listing Confirm")
    |> assign(:confirm, nil)
  end

  @impl true
  def handle_event("delete", %{"id" => id}, socket) do
    confirm = Database.get_confirm!(id)
    {:ok, _} = Database.delete_confirm(confirm)

    {:noreply, assign(socket, :confirm_collection, list_confirm())}
  end

  defp list_confirm do
    Database.list_confirm()
  end
end
