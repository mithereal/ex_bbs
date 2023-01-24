defmodule Api.Terminator.Abilities do
  use Api.Schema
  import Ecto.Changeset

  schema "terminator_uuid_abilities" do
    field :identifier, :string
    field :name, :string

    timestamps()
  end

  @doc false
  def changeset(abilities, attrs) do
    abilities
    |> cast(attrs, [:id, :name, :identifier])
    |> validate_required([:id, :name, :identifier])
  end
end
