defmodule ApiWeb.PrivMsgLive.Index do
  use ApiWeb, :live_view

  alias Api.Database
  alias Api.Database.PrivMsg

  @impl true
  def mount(_params, _session, socket) do
    {:ok, assign(socket, :privmsgs, list_privmsgs())}
  end

  @impl true
  def handle_params(params, _url, socket) do
    {:noreply, apply_action(socket, socket.assigns.live_action, params)}
  end

  defp apply_action(socket, :edit, %{"id" => id}) do
    socket
    |> assign(:page_title, "Edit Priv msg")
    |> assign(:priv_msg, Database.get_priv_msg!(id))
  end

  defp apply_action(socket, :new, _params) do
    socket
    |> assign(:page_title, "New Priv msg")
    |> assign(:priv_msg, %PrivMsg{})
  end

  defp apply_action(socket, :index, _params) do
    socket
    |> assign(:page_title, "Listing Privmsgs")
    |> assign(:priv_msg, nil)
  end

  @impl true
  def handle_event("delete", %{"id" => id}, socket) do
    priv_msg = Database.get_priv_msg!(id)
    {:ok, _} = Database.delete_priv_msg(priv_msg)

    {:noreply, assign(socket, :privmsgs, list_privmsgs())}
  end

  defp list_privmsgs do
    Database.list_privmsgs()
  end
end
