defmodule Api.Database.VoteDesc do
  use Ecto.Schema
  import Ecto.Changeset

  schema "vote_desc" do
    field :topic_id, :integer
    field :vote_id, :integer
    field :vote_length, :integer
    field :vote_start, :integer
    field :vote_text, :integer

    timestamps()
  end

  @doc false
  def changeset(vote_desc, attrs) do
    vote_desc
    |> cast(attrs, [:vote_id, :topic_id, :vote_text, :vote_start, :vote_length])
    |> validate_required([:vote_id, :topic_id, :vote_text, :vote_start, :vote_length])
  end
end
