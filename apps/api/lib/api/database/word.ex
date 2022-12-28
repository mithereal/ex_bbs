defmodule Api.Database.Word do
  use Ecto.Schema
  import Ecto.Changeset

  schema "words" do
    field :replacement, :string
    field :word, :string
    field :word_id, :integer

    timestamps()
  end

  @doc false
  def changeset(word, attrs) do
    word
    |> cast(attrs, [:word_id, :word, :replacement])
    |> validate_required([:word_id, :word, :replacement])
  end
end
