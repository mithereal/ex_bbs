defmodule ApiWeb.SearchWordlistLive.FormComponent do
  use ApiWeb, :live_component

  alias Api.Bbs.Schema

  @impl true
  def update(%{search_wordlist: search_wordlist} = assigns, socket) do
    changeset = Database.change_search_wordlist(search_wordlist)

    {:ok,
     socket
     |> assign(assigns)
     |> assign(:changeset, changeset)}
  end

  @impl true
  def handle_event("validate", %{"search_wordlist" => search_wordlist_params}, socket) do
    changeset =
      socket.assigns.search_wordlist
      |> Database.change_search_wordlist(search_wordlist_params)
      |> Map.put(:action, :validate)

    {:noreply, assign(socket, :changeset, changeset)}
  end

  def handle_event("save", %{"search_wordlist" => search_wordlist_params}, socket) do
    save_search_wordlist(socket, socket.assigns.action, search_wordlist_params)
  end

  defp save_search_wordlist(socket, :edit, search_wordlist_params) do
    case Database.update_search_wordlist(socket.assigns.search_wordlist, search_wordlist_params) do
      {:ok, _search_wordlist} ->
        {:noreply,
         socket
         |> put_flash(:info, "Search wordlist updated successfully")
         |> push_redirect(to: socket.assigns.return_to)}

      {:error, %Ecto.Changeset{} = changeset} ->
        {:noreply, assign(socket, :changeset, changeset)}
    end
  end

  defp save_search_wordlist(socket, :new, search_wordlist_params) do
    case Database.create_search_wordlist(search_wordlist_params) do
      {:ok, _search_wordlist} ->
        {:noreply,
         socket
         |> put_flash(:info, "Search wordlist created successfully")
         |> push_redirect(to: socket.assigns.return_to)}

      {:error, %Ecto.Changeset{} = changeset} ->
        {:noreply, assign(socket, changeset: changeset)}
    end
  end
end
