defmodule Api.Repo.Migrations.CreateAccounts do
  use Ecto.Migration

  def change do
    create table(:bbs_accounts, primary_key: false) do
      add :id, :uuid, primary_key: true
      add :email, :string
      add :active, :boolean

      add(:admin_user_id, references(:bbs_users, on_delete: :nothing, type: :uuid))

      timestamps()
    end

    alter table(:bbs_users) do
      add(:account_id, references(:bbs_accounts, on_delete: :nothing, type: :uuid))
    end
  end
end
