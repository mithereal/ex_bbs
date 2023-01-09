defmodule Api.Repo.Migrations.CreateBanlist do
  use Ecto.Migration

  def change do
    create table(:bbs_banlist, primary_key: false) do
      add :id, :uuid, primary_key: true
      add(:title, :string, null: false)

      add(:user_id, references(:bbs_users, on_delete: :nothing,type: :uuid))

      timestamps()
    end

    create(unique_index(:bbs_banlist, :id))
  end
end
