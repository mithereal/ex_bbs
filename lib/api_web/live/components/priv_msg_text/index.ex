defmodule ApiWeb.PrivMsgTextLive.Index do
  use ApiWeb, :live_view

  alias Api.Bbs.Schema
  alias Api.Bbs.Schema.PrivMsgText

  @impl true
  def mount(_params, _session, socket) do
    {:ok, assign(socket, :privmsgs_text, list_privmsgs_text())}
  end

  @impl true
  def handle_params(params, _url, socket) do
    {:noreply, apply_action(socket, socket.assigns.live_action, params)}
  end

  defp apply_action(socket, :edit, %{"id" => id}) do
    socket
    |> assign(:page_title, "Edit Priv msg text")
    |> assign(:priv_msg_text, Database.get_priv_msg_text!(id))
  end

  defp apply_action(socket, :new, _params) do
    socket
    |> assign(:page_title, "New Priv msg text")
    |> assign(:priv_msg_text, %PrivMsgText{})
  end

  defp apply_action(socket, :index, _params) do
    socket
    |> assign(:page_title, "Listing Privmsgs text")
    |> assign(:priv_msg_text, nil)
  end

  @impl true
  def handle_event("delete", %{"id" => id}, socket) do
    priv_msg_text = Database.get_priv_msg_text!(id)
    {:ok, _} = Database.delete_priv_msg_text(priv_msg_text)

    {:noreply, assign(socket, :privmsgs_text, list_privmsgs_text())}
  end

  defp list_privmsgs_text do
    Database.list_privmsgs_text()
  end
end
