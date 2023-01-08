defmodule ApiWeb.ConfirmLive.Show do
  use ApiWeb, :live_view

  alias Api.Bbs.Schema

  @impl true
  def mount(_params, _session, socket) do
    {:ok, socket}
  end

  @impl true
  def handle_params(%{"id" => id}, _, socket) do
    {:noreply,
     socket
     |> assign(:page_title, page_title(socket.assigns.live_action))
     |> assign(:confirm, Database.get_confirm!(id))}
  end

  defp page_title(:show), do: "Show Confirm"
  defp page_title(:edit), do: "Edit Confirm"
end
