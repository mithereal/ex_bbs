defmodule Api.Bbs.Schema.SearchWordlist do
  use Ecto.Schema
  import Ecto.Changeset

  schema "search_wordlist" do
    field :word_common, :string
    field :word_id, :integer
    field :word_text, :string

    timestamps()
  end

  @doc false
  def changeset(search_wordlist, attrs) do
    search_wordlist
    |> cast(attrs, [:word_id, :word_text, :word_common])
    |> validate_required([:word_id, :word_text, :word_common])
  end
end
