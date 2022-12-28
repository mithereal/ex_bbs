defmodule Api.Repo.Migrations.CreateGroups do
  use Ecto.Migration

  def change do
    create table(:groups) do
      add(:group_id, :integer, null: false)
      add(:group_name, :string, null: false)
      add(:group_type, :integer, null: false, default: 1)
      add(:group_description, :string, null: false)
      add(:group_moderator, :integer, null: false, default: 0)
      add(:group_single_user, :integer, null: false, default: 0)

      timestamps()
    end

    create(unique_index(:groups, :group_id))
  end
end
