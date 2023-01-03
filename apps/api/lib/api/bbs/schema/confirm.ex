defmodule Api.Bbs.Schema.Confirm do
  use Ecto.Schema
  import Ecto.Changeset

  schema "confirm" do
    field :code, :integer
    field :confirm_id, :integer
    field :session_id, :integer

    timestamps()
  end

  @doc false
  def changeset(confirm, attrs) do
    confirm
    |> cast(attrs, [:confirm_id, :session_id, :code])
    |> validate_required([:confirm_id, :session_id, :code])
  end
end
