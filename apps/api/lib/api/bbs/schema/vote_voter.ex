defmodule Api.Bbs.Schema.VoteVoter do
  use Ecto.Schema
  import Ecto.Changeset

  schema "vote_voters" do
    field :vote_id, :integer
    field :vote_user_id, :integer
    field :vote_user_ip, :string

    timestamps()
  end

  @doc false
  def changeset(vote_voter, attrs) do
    vote_voter
    |> cast(attrs, [:vote_id, :vote_user_id, :vote_user_ip])
    |> validate_required([:vote_id, :vote_user_id, :vote_user_ip])
  end
end
