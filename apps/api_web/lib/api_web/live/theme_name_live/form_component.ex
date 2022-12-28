defmodule ApiWeb.ThemeNameLive.FormComponent do
  use ApiWeb, :live_component

  alias Api.Database

  @impl true
  def update(%{theme_name: theme_name} = assigns, socket) do
    changeset = Database.change_theme_name(theme_name)

    {:ok,
     socket
     |> assign(assigns)
     |> assign(:changeset, changeset)}
  end

  @impl true
  def handle_event("validate", %{"theme_name" => theme_name_params}, socket) do
    changeset =
      socket.assigns.theme_name
      |> Database.change_theme_name(theme_name_params)
      |> Map.put(:action, :validate)

    {:noreply, assign(socket, :changeset, changeset)}
  end

  def handle_event("save", %{"theme_name" => theme_name_params}, socket) do
    save_theme_name(socket, socket.assigns.action, theme_name_params)
  end

  defp save_theme_name(socket, :edit, theme_name_params) do
    case Database.update_theme_name(socket.assigns.theme_name, theme_name_params) do
      {:ok, _theme_name} ->
        {:noreply,
         socket
         |> put_flash(:info, "Theme name updated successfully")
         |> push_redirect(to: socket.assigns.return_to)}

      {:error, %Ecto.Changeset{} = changeset} ->
        {:noreply, assign(socket, :changeset, changeset)}
    end
  end

  defp save_theme_name(socket, :new, theme_name_params) do
    case Database.create_theme_name(theme_name_params) do
      {:ok, _theme_name} ->
        {:noreply,
         socket
         |> put_flash(:info, "Theme name created successfully")
         |> push_redirect(to: socket.assigns.return_to)}

      {:error, %Ecto.Changeset{} = changeset} ->
        {:noreply, assign(socket, changeset: changeset)}
    end
  end
end
