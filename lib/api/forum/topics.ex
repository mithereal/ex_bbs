defmodule Api.Forum.Topics do
  use Api.Schema
  import Ecto.Changeset

  schema "topics" do
    field :description, :string
    field :status, :integer
    field :title, :string

    timestamps()
  end

  @doc false
  def changeset(topics, attrs) do
    topics
    |> cast(attrs, [:id, :title, :description, :status])
    |> validate_required([:id, :title, :description, :status])
  end
end
