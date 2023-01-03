defmodule Api.Bbs.Schema.ForumPrune do
  use Ecto.Schema
  import Ecto.Changeset

  schema "forum_prune" do
    field :forum_id, :integer
    field :prune_days, :integer
    field :prune_freq, :integer
    field :prune_id, :integer

    timestamps()
  end

  @doc false
  def changeset(forum_prune, attrs) do
    forum_prune
    |> cast(attrs, [:prune_id, :forum_id, :prune_days, :prune_freq])
    |> validate_required([:prune_id, :forum_id, :prune_days, :prune_freq])
  end
end
