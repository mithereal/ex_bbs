defmodule Api.Bbs.Schema.Smiles do
  use Ecto.Schema
  import Ecto.Changeset

  schema "smiles" do
    field :code, :string
    field :emoticon, :string
    field :smile_url, :string
    field :smilies_id, :integer

    timestamps()
  end

  @doc false
  def changeset(smiles, attrs) do
    smiles
    |> cast(attrs, [:smilies_id, :code, :smile_url, :emoticon])
    |> validate_required([:smilies_id, :code, :smile_url, :emoticon])
  end
end
