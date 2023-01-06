defmodule Api.Repo.Migrations.CreateUsersAuthTables do
  use Ecto.Migration

  def change do
    execute "CREATE EXTENSION IF NOT EXISTS citext", ""

    create table(:system_users) do
      #    add(:id, :uuid, primary_key: true)
      add :uid, :string
      add :email, :citext, null: false
      add :active, :boolean, default: false
      add :username, :string, null: false
      add :hashed_password, :string, null: false
      add :confirmed_at, :naive_datetime
      add :performer_id, references(Terminator.Performer.table())
      add :last_login, :string, null: true
      timestamps()
    end

    create unique_index(:system_users, [:email])

    create table(:system_users_tokens) do
      add :user_id, references(:users, on_delete: :delete_all), null: false
      add :token, :binary, null: false
      add :context, :string, null: false
      add :sent_to, :string
      timestamps(updated_at: false)
    end

    create index(:system_users_tokens, [:user_id])
    create unique_index(:system_users_tokens, [:context, :token])
  end
end
