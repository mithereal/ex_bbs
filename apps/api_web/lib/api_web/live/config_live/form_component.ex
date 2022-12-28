defmodule ApiWeb.ConfigLive.FormComponent do
  use ApiWeb, :live_component

  alias Api.Database

  @impl true
  def update(%{config: config} = assigns, socket) do
    changeset = Database.change_config(config)

    {:ok,
     socket
     |> assign(assigns)
     |> assign(:changeset, changeset)}
  end

  @impl true
  def handle_event("validate", %{"config" => config_params}, socket) do
    changeset =
      socket.assigns.config
      |> Database.change_config(config_params)
      |> Map.put(:action, :validate)

    {:noreply, assign(socket, :changeset, changeset)}
  end

  def handle_event("save", %{"config" => config_params}, socket) do
    save_config(socket, socket.assigns.action, config_params)
  end

  defp save_config(socket, :edit, config_params) do
    case Database.update_config(socket.assigns.config, config_params) do
      {:ok, _config} ->
        {:noreply,
         socket
         |> put_flash(:info, "Config updated successfully")
         |> push_redirect(to: socket.assigns.return_to)}

      {:error, %Ecto.Changeset{} = changeset} ->
        {:noreply, assign(socket, :changeset, changeset)}
    end
  end

  defp save_config(socket, :new, config_params) do
    case Database.create_config(config_params) do
      {:ok, _config} ->
        {:noreply,
         socket
         |> put_flash(:info, "Config created successfully")
         |> push_redirect(to: socket.assigns.return_to)}

      {:error, %Ecto.Changeset{} = changeset} ->
        {:noreply, assign(socket, changeset: changeset)}
    end
  end
end
