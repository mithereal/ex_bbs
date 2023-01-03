defmodule ApiWeb.SessionKeysLive.Show do
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
     |> assign(:session_keys, Database.get_session_keys!(id))}
  end

  defp page_title(:show), do: "Show Session keys"
  defp page_title(:edit), do: "Edit Session keys"
end
