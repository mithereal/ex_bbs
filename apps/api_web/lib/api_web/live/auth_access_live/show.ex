defmodule ApiWeb.AuthAccessLive.Show do
  use ApiWeb, :live_view

  alias Api.Database

  @impl true
  def mount(_params, _session, socket) do
    {:ok, socket}
  end

  @impl true
  def handle_params(%{"id" => id}, _, socket) do
    {:noreply,
     socket
     |> assign(:page_title, page_title(socket.assigns.live_action))
     |> assign(:auth_access, Database.get_auth_access!(id))}
  end

  defp page_title(:show), do: "Show Auth access"
  defp page_title(:edit), do: "Edit Auth access"
end
