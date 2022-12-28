defmodule Api.Database.Category do
  use Ecto.Schema
  import Ecto.Changeset

  schema "categories" do
    field :cat_id, :integer
    field :cat_order, :integer
    field :cat_title, :string

    timestamps()
  end

  @doc false
  def changeset(category, attrs) do
    category
    |> cast(attrs, [:cat_id, :cat_title, :cat_order])
    |> validate_required([:cat_id, :cat_title, :cat_order])
  end
end
