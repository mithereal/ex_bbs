defmodule Api.Terminator.Entities do
  use Api.Schema
  import Ecto.Changeset

  schema "terminator_entities" do
    field :abilities, :string
    field :assoc_type, :string

    timestamps()
  end

  @doc false
  def changeset(entities, attrs) do
    entities
    |> cast(attrs, [:id, :assoc_type, :abilities])
    |> validate_required([:id, :assoc_type, :abilities])
  end
end
