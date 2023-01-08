defmodule ApiWeb.SearchResultLive.FormComponent do
  use ApiWeb, :live_component

  alias Api.Bbs.Schema

  @impl true
  def update(%{search_result: search_result} = assigns, socket) do
    changeset = Database.change_search_result(search_result)

    {:ok,
     socket
     |> assign(assigns)
     |> assign(:changeset, changeset)}
  end

  @impl true
  def handle_event("validate", %{"search_result" => search_result_params}, socket) do
    changeset =
      socket.assigns.search_result
      |> Database.change_search_result(search_result_params)
      |> Map.put(:action, :validate)

    {:noreply, assign(socket, :changeset, changeset)}
  end

  def handle_event("save", %{"search_result" => search_result_params}, socket) do
    save_search_result(socket, socket.assigns.action, search_result_params)
  end

  defp save_search_result(socket, :edit, search_result_params) do
    case Database.update_search_result(socket.assigns.search_result, search_result_params) do
      {:ok, _search_result} ->
        {:noreply,
         socket
         |> put_flash(:info, "Search result updated successfully")
         |> push_redirect(to: socket.assigns.return_to)}

      {:error, %Ecto.Changeset{} = changeset} ->
        {:noreply, assign(socket, :changeset, changeset)}
    end
  end

  defp save_search_result(socket, :new, search_result_params) do
    case Database.create_search_result(search_result_params) do
      {:ok, _search_result} ->
        {:noreply,
         socket
         |> put_flash(:info, "Search result created successfully")
         |> push_redirect(to: socket.assigns.return_to)}

      {:error, %Ecto.Changeset{} = changeset} ->
        {:noreply, assign(socket, changeset: changeset)}
    end
  end
end
