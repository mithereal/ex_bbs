defmodule Api.Repo.Migrations.CreateAccounts do
  use Ecto.Migration

  def change do
    create table(:bbs_accounts) do
      add :id, :uuid, primary_key: true, null: false
      add :hash, :string
      add :email, :string

      timestamps()
    end

    alter table(:users) do
      add :account_id, references(:bbs_accounts, on_delete: :nothing)
    end
  end
end
