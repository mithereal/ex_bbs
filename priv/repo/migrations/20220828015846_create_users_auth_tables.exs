defmodule Api.Repo.Migrations.CreateUsersAuthTables do
  use Ecto.Migration

  def change do
    execute "CREATE EXTENSION IF NOT EXISTS citext", ""

    create table(:bbs_users, primary_key: false) do
      add :id, :uuid, primary_key: true
      add :email, :citext, null: false
      add :active, :boolean, default: false
      add :username, :string, null: false
      add :hashed_password, :string, null: false
      add :confirmed_at, :naive_datetime
      add :performer_id, references(Terminator.Performer.table(), type: :uuid)
      add :last_login, :string, null: true
      timestamps()
    end

    create unique_index(:bbs_users, [:email])

    create table(:bbs_users_tokens) do
      add :user_id, references(:bbs_users, on_delete: :delete_all, type: :uuid), null: false
      add :token, :binary, null: false
      add :context, :string, null: false
      add :sent_to, :string
      timestamps(updated_at: false)
    end

    create index(:bbs_users_tokens, [:user_id])
    create unique_index(:bbs_users_tokens, [:context, :token])
  end
end
