defmodule Api.System.HitCounter do
  use Api.Schema
  import Ecto.Changeset

  schema "bbs_hit_counters" do
    field :key, :string
    field :value, :string
  end
end
