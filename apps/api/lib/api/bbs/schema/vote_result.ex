defmodule Api.Bbs.Schema.VoteResult do
  use Ecto.Schema
  import Ecto.Changeset

  schema "vote_results" do
    field :vote_id, :integer
    field :vote_option_id, :integer
    field :vote_option_text, :string
    field :vote_result, :integer

    timestamps()
  end

  @doc false
  def changeset(vote_result, attrs) do
    vote_result
    |> cast(attrs, [:vote_id, :vote_option_id, :vote_option_text, :vote_result])
    |> validate_required([:vote_id, :vote_option_id, :vote_option_text, :vote_result])
  end
end
