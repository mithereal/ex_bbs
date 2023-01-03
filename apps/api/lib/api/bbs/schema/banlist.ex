defmodule Api.Bbs.Schema.Banlist do
  use Ecto.Schema
  import Ecto.Changeset

  schema "banlist" do
    field :group_description, :string
    field :group_id, :integer
    field :group_moderator, :integer
    field :group_name, :string
    field :group_single_user, :integer
    field :group_type, :integer

    timestamps()
  end

  @doc false
  def changeset(banlist, attrs) do
    banlist
    |> cast(attrs, [:group_id, :group_name, :group_type, :group_description, :group_moderator, :group_single_user])
    |> validate_required([:group_id, :group_name, :group_type, :group_description, :group_moderator, :group_single_user])
  end
end