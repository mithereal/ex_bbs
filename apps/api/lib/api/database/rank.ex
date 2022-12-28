defmodule Api.Database.Rank do
  use Ecto.Schema
  import Ecto.Changeset

  schema "ranks" do
    field :rank_id, :integer
    field :rank_image, :string
    field :rank_min, :integer
    field :rank_special, :integer
    field :rank_title, :string

    timestamps()
  end

  @doc false
  def changeset(rank, attrs) do
    rank
    |> cast(attrs, [:rank_id, :rank_title, :rank_min, :rank_special, :rank_image])
    |> validate_required([:rank_id, :rank_title, :rank_min, :rank_special, :rank_image])
  end
end
