defmodule Api.Terminator.Role do
  use Api.Schema
  import Ecto.Changeset

  schema "terminator_roles" do
    field :abilities, {:array, :string}
    field :identifier, :string
    field :name, :string

    timestamps()
  end

  @doc false
  def changeset(role, attrs) do
    role
    |> cast(attrs, [:id, :abilities, :name, :identifier])
    |> validate_required([:id, :abilities, :name, :identifier])
  end
end
