defmodule Api.Database.UserGroup do
  use Ecto.Schema
  import Ecto.Changeset

  schema "user_group" do
    field :group_id, :integer
    field :user_id, :integer
    field :user_pending, :integer

    timestamps()
  end

  @doc false
  def changeset(user_group, attrs) do
    user_group
    |> cast(attrs, [:group_id, :user_id, :user_pending])
    |> validate_required([:group_id, :user_id, :user_pending])
  end
end
