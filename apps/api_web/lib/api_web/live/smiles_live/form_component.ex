defmodule ApiWeb.SmilesLive.FormComponent do
  use ApiWeb, :live_component

  alias Api.Database

  @impl true
  def update(%{smiles: smiles} = assigns, socket) do
    changeset = Database.change_smiles(smiles)

    {:ok,
     socket
     |> assign(assigns)
     |> assign(:changeset, changeset)}
  end

  @impl true
  def handle_event("validate", %{"smiles" => smiles_params}, socket) do
    changeset =
      socket.assigns.smiles
      |> Database.change_smiles(smiles_params)
      |> Map.put(:action, :validate)

    {:noreply, assign(socket, :changeset, changeset)}
  end

  def handle_event("save", %{"smiles" => smiles_params}, socket) do
    save_smiles(socket, socket.assigns.action, smiles_params)
  end

  defp save_smiles(socket, :edit, smiles_params) do
    case Database.update_smiles(socket.assigns.smiles, smiles_params) do
      {:ok, _smiles} ->
        {:noreply,
         socket
         |> put_flash(:info, "Smiles updated successfully")
         |> push_redirect(to: socket.assigns.return_to)}

      {:error, %Ecto.Changeset{} = changeset} ->
        {:noreply, assign(socket, :changeset, changeset)}
    end
  end

  defp save_smiles(socket, :new, smiles_params) do
    case Database.create_smiles(smiles_params) do
      {:ok, _smiles} ->
        {:noreply,
         socket
         |> put_flash(:info, "Smiles created successfully")
         |> push_redirect(to: socket.assigns.return_to)}

      {:error, %Ecto.Changeset{} = changeset} ->
        {:noreply, assign(socket, changeset: changeset)}
    end
  end
end
