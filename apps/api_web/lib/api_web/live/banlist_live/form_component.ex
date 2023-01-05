defmodule ApiWeb.BanlistLive.FormComponent do
  use ApiWeb, :live_component

  alias Api.Bbs

  @impl true
  def update(%{banlist: banlist} = assigns, socket) do
    changeset = Bbs.change_banlist(banlist)

    {:ok,
     socket
     |> assign(assigns)
     |> assign(:changeset, changeset)}
  end

  @impl true
  def handle_event("validate", %{"banlist" => banlist_params}, socket) do
    changeset =
      socket.assigns.banlist
      |> Bbs.change_banlist(banlist_params)
      |> Map.put(:action, :validate)

    {:noreply, assign(socket, :changeset, changeset)}
  end

  def handle_event("save", %{"banlist" => banlist_params}, socket) do
    save_banlist(socket, socket.assigns.action, banlist_params)
  end

  defp save_banlist(socket, :edit, banlist_params) do
    case Bbs.update_banlist(socket.assigns.banlist, banlist_params) do
      {:ok, _banlist} ->
        {:noreply,
         socket
         |> put_flash(:info, "Banlist updated successfully")
         |> push_redirect(to: socket.assigns.return_to)}

      {:error, %Ecto.Changeset{} = changeset} ->
        {:noreply, assign(socket, :changeset, changeset)}
    end
  end

  defp save_banlist(socket, :new, banlist_params) do
    case Bbs.create_banlist(banlist_params) do
      {:ok, _banlist} ->
        {:noreply,
         socket
         |> put_flash(:info, "Banlist created successfully")
         |> push_redirect(to: socket.assigns.return_to)}

      {:error, %Ecto.Changeset{} = changeset} ->
        {:noreply, assign(socket, changeset: changeset)}
    end
  end
end
