defmodule Api.Repo.Migrations.CreateGroups do
  use Ecto.Migration

  def change do
    create table(:bbs_groups) do
      add :id, :uuid, primary_key: true, null: false
      add(:title, :string, null: false)
      add(:type, :integer, null: false, default: 1)
      add(:description, :string, null: false)

      timestamps()
    end

    create(unique_index(:groups, :id))
  end

  alter table(:bbs_groups) do
    add(:moderator_id, references(:bbs_users, on_delete: :nothing))
  end
end
