defmodule Api.Database.Session do
  use Ecto.Schema
  import Ecto.Changeset

  schema "sessions" do
    field :session_admin, :integer
    field :session_id, :string
    field :session_ip, :string
    field :session_logged_in, :integer
    field :session_page, :integer
    field :session_start, :integer
    field :session_time, :integer
    field :session_user_id, :integer

    timestamps()
  end

  @doc false
  def changeset(session, attrs) do
    session
    |> cast(attrs, [:session_id, :session_user_id, :session_start, :session_time, :session_ip, :session_page, :session_logged_in, :session_admin])
    |> validate_required([:session_id, :session_user_id, :session_start, :session_time, :session_ip, :session_page, :session_logged_in, :session_admin])
  end
end
