defmodule ApiWeb.SearchWordmatchLive.FormComponent do
  use ApiWeb, :live_component

  alias Api.Database

  @impl true
  def update(%{search_wordmatch: search_wordmatch} = assigns, socket) do
    changeset = Database.change_search_wordmatch(search_wordmatch)

    {:ok,
     socket
     |> assign(assigns)
     |> assign(:changeset, changeset)}
  end

  @impl true
  def handle_event("validate", %{"search_wordmatch" => search_wordmatch_params}, socket) do
    changeset =
      socket.assigns.search_wordmatch
      |> Database.change_search_wordmatch(search_wordmatch_params)
      |> Map.put(:action, :validate)

    {:noreply, assign(socket, :changeset, changeset)}
  end

  def handle_event("save", %{"search_wordmatch" => search_wordmatch_params}, socket) do
    save_search_wordmatch(socket, socket.assigns.action, search_wordmatch_params)
  end

  defp save_search_wordmatch(socket, :edit, search_wordmatch_params) do
    case Database.update_search_wordmatch(socket.assigns.search_wordmatch, search_wordmatch_params) do
      {:ok, _search_wordmatch} ->
        {:noreply,
         socket
         |> put_flash(:info, "Search wordmatch updated successfully")
         |> push_redirect(to: socket.assigns.return_to)}

      {:error, %Ecto.Changeset{} = changeset} ->
        {:noreply, assign(socket, :changeset, changeset)}
    end
  end

  defp save_search_wordmatch(socket, :new, search_wordmatch_params) do
    case Database.create_search_wordmatch(search_wordmatch_params) do
      {:ok, _search_wordmatch} ->
        {:noreply,
         socket
         |> put_flash(:info, "Search wordmatch created successfully")
         |> push_redirect(to: socket.assigns.return_to)}

      {:error, %Ecto.Changeset{} = changeset} ->
        {:noreply, assign(socket, changeset: changeset)}
    end
  end
end
