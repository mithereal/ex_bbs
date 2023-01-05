defmodule Api.Bbs.Schema.Banlist do
  use Ecto.Schema
  import Ecto.Changeset

  schema "banlist" do
    field :ban_email, :string
    field :ban_id, :integer
    field :ban_ip, :string
    field :ban_userid, :integer

    timestamps()
  end

  @doc false
  def changeset(banlist, attrs) do
    banlist
    |> cast(attrs, [:ban_id, :ban_userid, :ban_ip, :ban_email])
    |> validate_required([:ban_id, :ban_userid, :ban_ip, :ban_email])
  end
end
