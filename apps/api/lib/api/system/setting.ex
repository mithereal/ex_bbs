defmodule Api.System.Setting do
  use Ecto.Schema
  import Ecto.Changeset

  schema "api_settings" do
    field :key, :string
    field :name, :string
    field :type, :string
    field :value, :string

    timestamps()
  end

  @doc false
  def changeset(setting, attrs) do
    setting
    |> cast(attrs, [:name, :key, :value, :type])
    |> validate_required([:name, :key, :value, :type])
  end
end
