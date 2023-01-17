defmodule Api.Forum.Categories do
  use Ecto.Schema
  import Ecto.Changeset

  schema "categories" do
    field :description, :string
    field :id, Ecto.UUID
    field :order, :integer
    field :status, :integer
    field :title, :string

    timestamps()
  end

  @doc false
  def changeset(categories, attrs) do
    categories
    |> cast(attrs, [:id, :title, :description, :status, :order])
    |> validate_required([:id, :title, :description, :status, :order])
  end
end
