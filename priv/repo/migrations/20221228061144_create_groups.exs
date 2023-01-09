defmodule Api.Repo.Migrations.CreateGroups do
  use Ecto.Migration

  def change do
    create table(:bbs_groups) do
      add(:title, :string, null: false)
      add(:type, :integer, null: false, default: 1)
      add(:description, :string, null: false)

      add(:moderator_id, references(:bbs_users, on_delete: :nothing))

      timestamps()
    end

    create(unique_index(:bbs_groups, :id))
  end
end
