defmodule ApiWeb.SmilesLive.Index do
  use ApiWeb, :live_view

  alias Api.Bbs.Schema
  alias Api.Bbs.Schema.Smiles

  @impl true
  def mount(_params, _session, socket) do
    {:ok, assign(socket, :smiles_collection, list_smiles())}
  end

  @impl true
  def handle_params(params, _url, socket) do
    {:noreply, apply_action(socket, socket.assigns.live_action, params)}
  end

  defp apply_action(socket, :edit, %{"id" => id}) do
    socket
    |> assign(:page_title, "Edit Smiles")
    |> assign(:smiles, Database.get_smiles!(id))
  end

  defp apply_action(socket, :new, _params) do
    socket
    |> assign(:page_title, "New Smiles")
    |> assign(:smiles, %Smiles{})
  end

  defp apply_action(socket, :index, _params) do
    socket
    |> assign(:page_title, "Listing Smiles")
    |> assign(:smiles, nil)
  end

  @impl true
  def handle_event("delete", %{"id" => id}, socket) do
    smiles = Database.get_smiles!(id)
    {:ok, _} = Database.delete_smiles(smiles)

    {:noreply, assign(socket, :smiles_collection, list_smiles())}
  end

  defp list_smiles do
    Database.list_smiles()
  end
end
