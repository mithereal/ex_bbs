defmodule Api.Forum.Forums do
  use Api.Schema
  import Ecto.Changeset

  schema "bbs_forums" do
    field :description, :string
    field :order, :integer
    field :status, :integer
    field :title, :string

    timestamps()
  end

  @doc false
  def changeset(forums, attrs) do
    forums
    |> cast(attrs, [:id, :title, :description, :status, :order])
    |> validate_required([:id, :title, :description, :status, :order])
  end
end
