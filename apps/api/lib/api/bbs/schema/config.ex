defmodule Api.Bbs.Schema.Config do
  use Ecto.Schema
  import Ecto.Changeset

  schema "config" do
    field :config_name, :string
    field :config_value, :string

    timestamps()
  end

  @doc false
  def changeset(config, attrs) do
    config
    |> cast(attrs, [:config_name, :config_value])
    |> validate_required([:config_name, :config_value])
  end
end
