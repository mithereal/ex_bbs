defmodule ApiWeb.PrivMsgTextLive.Show do
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
     |> assign(:priv_msg_text, Database.get_priv_msg_text!(id))}
  end

  defp page_title(:show), do: "Show Priv msg text"
  defp page_title(:edit), do: "Edit Priv msg text"
end
