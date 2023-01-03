defmodule Api.Bbs.Schema.SearchWordmatch do
  use Ecto.Schema
  import Ecto.Changeset

  schema "search_wordmatch" do
    field :post_id, :integer
    field :title_match, :integer
    field :word_id, :integer

    timestamps()
  end

  @doc false
  def changeset(search_wordmatch, attrs) do
    search_wordmatch
    |> cast(attrs, [:post_id, :word_id, :title_match])
    |> validate_required([:post_id, :word_id, :title_match])
  end
end
