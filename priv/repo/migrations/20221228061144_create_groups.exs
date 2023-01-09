defmodule Api.Repo.Migrations.CreateGroups do
  use Ecto.Migration

  def change do
    create table(:bbs_groups,primary_key: false) do
      add :id, :uuid, primary_key: true
      add(:title, :string, null: false)
      add(:type, :integer, null: false, default: 1)
      add(:description, :string, null: false)

      add(:moderator_id, references(:bbs_users, on_delete: :nothing, type: :uuid))

      timestamps()
    end

    create(unique_index(:bbs_groups, :id))
  end
end
