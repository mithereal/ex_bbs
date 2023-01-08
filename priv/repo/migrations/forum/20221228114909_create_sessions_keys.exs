defmodule Api.Repo.Migrations.CreateSessionsKeys do
  use Ecto.Migration

  def change do
    create table(:sessions_keys) do
      add :key_id, :string
      add :user_id, :integer
      add :last_ip, :string
      add :last_login, :integer

      timestamps()
    end
  end
end
