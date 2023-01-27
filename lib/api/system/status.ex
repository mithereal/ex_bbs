defmodule Api.System.Status do
  use Api.Schema
  import Ecto.Changeset

  schema "bbs_status" do
    field :title, :string
    field :type, :string
  end

  @doc false
  def changeset(status, attrs) do
    status
    |> cast(attrs, [:title, :type])
    |> validate_required([:title, :type])
  end
end
