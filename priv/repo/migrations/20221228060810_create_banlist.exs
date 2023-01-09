defmodule Api.Repo.Migrations.CreateBanlist do
  use Ecto.Migration

  def change do
    create table(:bbs_banlist) do
      add(:title, :string, null: false)

      add(:user_id, references(:bbs_users, on_delete: :nothing))

      timestamps()
    end

    create(unique_index(:bbs_banlist, :id))
  end
end
