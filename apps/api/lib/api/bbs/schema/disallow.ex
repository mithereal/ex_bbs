defmodule Api.Bbs.Schema.Disallow do
  use Ecto.Schema
  import Ecto.Changeset

  schema "disallow" do
    field :disallow_id, :integer
    field :disallow_username, :string

    timestamps()
  end

  @doc false
  def changeset(disallow, attrs) do
    disallow
    |> cast(attrs, [:disallow_id, :disallow_username])
    |> validate_required([:disallow_id, :disallow_username])
  end
end
