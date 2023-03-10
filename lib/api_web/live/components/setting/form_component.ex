defmodule ApiWeb.SettingLive.FormComponent do
  use ApiWeb, :live_component

  alias Api.System

  @impl true
  def update(%{setting: setting} = assigns, socket) do
    changeset = System.change_setting(setting)

    {:ok,
     socket
     |> assign(assigns)
     |> assign(:changeset, changeset)}
  end

  @impl true
  def handle_event("validate", %{"setting" => setting_params}, socket) do
    changeset =
      socket.assigns.setting
      |> System.change_setting(setting_params)
      |> Map.put(:action, :validate)

    {:noreply, assign(socket, :changeset, changeset)}
  end

  def handle_event("save", %{"setting" => setting_params}, socket) do
    save_setting(socket, socket.assigns.action, setting_params)
  end

  defp save_setting(socket, :edit, setting_params) do
    case System.update_setting(socket.assigns.setting, setting_params) do
      {:ok, _setting} ->
        {:noreply,
         socket
         |> put_flash(:info, "Setting updated successfully")
         |> push_redirect(to: socket.assigns.return_to)}

      {:error, %Ecto.Changeset{} = changeset} ->
        {:noreply, assign(socket, :changeset, changeset)}
    end
  end

  defp save_setting(socket, :new, setting_params) do
    case System.create_setting(setting_params) do
      {:ok, _setting} ->
        {:noreply,
         socket
         |> put_flash(:info, "Setting created successfully")
         |> push_redirect(to: socket.assigns.return_to)}

      {:error, %Ecto.Changeset{} = changeset} ->
        {:noreply, assign(socket, changeset: changeset)}
    end
  end
end
