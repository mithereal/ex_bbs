defmodule Api.Repo.Migrations.CreateAccounts do
  use Ecto.Migration

  def change do
    create table(:accounts) do
      add :hash, :string
      add :email, :string

      timestamps()
    end

    alter table(:users) do
      add :account_id, references(:accounts, on_delete: :nothing)
    end
  end
end
