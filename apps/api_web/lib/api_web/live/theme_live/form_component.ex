defmodule ApiWeb.ThemeLive.FormComponent do
  use ApiWeb, :live_component

  alias Api.Database

  @impl true
  def update(%{theme: theme} = assigns, socket) do
    changeset = Database.change_theme(theme)

    {:ok,
     socket
     |> assign(assigns)
     |> assign(:changeset, changeset)}
  end

  @impl true
  def handle_event("validate", %{"theme" => theme_params}, socket) do
    changeset =
      socket.assigns.theme
      |> Database.change_theme(theme_params)
      |> Map.put(:action, :validate)

    {:noreply, assign(socket, :changeset, changeset)}
  end

  def handle_event("save", %{"theme" => theme_params}, socket) do
    save_theme(socket, socket.assigns.action, theme_params)
  end

  defp save_theme(socket, :edit, theme_params) do
    case Database.update_theme(socket.assigns.theme, theme_params) do
      {:ok, _theme} ->
        {:noreply,
         socket
         |> put_flash(:info, "Theme updated successfully")
         |> push_redirect(to: socket.assigns.return_to)}

      {:error, %Ecto.Changeset{} = changeset} ->
        {:noreply, assign(socket, :changeset, changeset)}
    end
  end

  defp save_theme(socket, :new, theme_params) do
    case Database.create_theme(theme_params) do
      {:ok, _theme} ->
        {:noreply,
         socket
         |> put_flash(:info, "Theme created successfully")
         |> push_redirect(to: socket.assigns.return_to)}

      {:error, %Ecto.Changeset{} = changeset} ->
        {:noreply, assign(socket, changeset: changeset)}
    end
  end
end
