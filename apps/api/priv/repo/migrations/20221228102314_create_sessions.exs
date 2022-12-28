defmodule Api.Repo.Migrations.CreateSessions do
  use Ecto.Migration

  def change do
    create table(:sessions) do
      add :session_id, :string
      add :session_user_id, :integer
      add :session_start, :integer
      add :session_time, :integer
      add :session_ip, :string
      add :session_page, :integer
      add :session_logged_in, :integer
      add :session_admin, :integer

      timestamps()
    end
  end
end
