defmodule Api.Bbs.Schema.SessionKeys do
  use Ecto.Schema
  import Ecto.Changeset

  schema "sessions_keys" do
    field :key_id, :string
    field :last_ip, :string
    field :last_login, :integer
    field :user_id, :integer

    timestamps()
  end

  @doc false
  def changeset(session_keys, attrs) do
    session_keys
    |> cast(attrs, [:key_id, :user_id, :last_ip, :last_login])
    |> validate_required([:key_id, :user_id, :last_ip, :last_login])
  end
end
