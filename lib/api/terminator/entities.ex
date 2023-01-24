defmodule Api.Terminator.Entities do
  use Api.Schema
  import Ecto.Changeset

  schema "terminator_uuid_performers_entities" do
    field :abilities, :string
    field :assoc_type, :string

    belongs_to(:performer, Terminator.Performer)

    timestamps()
  end

  @doc false
  def changeset(entities, attrs) do
    entities
    |> cast(attrs, [:id, :assoc_type, :abilities])
    |> validate_required([:id, :assoc_type, :abilities])
  end
end
