defmodule Api.Repo.Migrations.CreateBanlist do
  use Ecto.Migration

  def change do
    create table(:bbs_banlist) do
      add :id, :uuid, primary_key: true, null: false
      add(:titld, :string, null: false)

      timestamps()
    end

    create(unique_index(:banlist, :id))
  end

  alter table(:bbs_banlist) do
    add(:user_id, references(:bbs_users, on_delete: :nothing))
  end
end
