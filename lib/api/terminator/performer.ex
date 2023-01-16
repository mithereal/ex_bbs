defmodule Api.Terminator.Performer do
  use Api.Schema
  import Ecto.Changeset

  schema "terminator_performers" do
    field :abilities, {:array, :string}

    timestamps()
  end

  @doc false
  def changeset(performer, attrs) do
    performer
    |> cast(attrs, [:id, :abilities])
    |> validate_required([:id, :abilities])
  end
end
