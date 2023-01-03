defmodule Api.Bbs.Schema.AuthAccess do
  use Ecto.Schema
  import Ecto.Changeset

  schema "auth_access" do
    field :auth_post, :integer
    field :auth_read, :integer
    field :auth_reply, :integer
    field :auth_view, :integer
    field :forum_id, :integer
    field :group_id, :integer

    timestamps()
  end

  @doc false
  def changeset(auth_access, attrs) do
    auth_access
    |> cast(attrs, [:group_id, :forum_id, :auth_view, :auth_read, :auth_post, :auth_reply])
    |> validate_required([:group_id, :forum_id, :auth_view, :auth_read, :auth_post, :auth_reply])
  end
end
