defmodule Api.Repo.Migrations.CreateAccounts do
  use Ecto.Migration

  def change do
    create table(:system_accounts) do
      add :hash, :string
      add :email, :string

      timestamps()
    end

    alter table(:system_users) do
      add :account_id, references(:system_accounts, on_delete: :nothing)
    end
  end
end
