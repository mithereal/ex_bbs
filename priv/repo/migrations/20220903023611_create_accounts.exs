defmodule Api.Repo.Migrations.CreateAccounts do
  use Ecto.Migration

  def change do
    create table(:bbs_accounts) do
      add :hash, :string
      add :email, :string

      timestamps()
    end
    alter table(:bbs_users) do
      add(:account_id, references(:bbs_accounts, on_delete: :nothing))
    end
  end
end
