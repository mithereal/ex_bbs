defmodule Api.Repo.Migrations.CreateAuthAccess do
  use Ecto.Migration

  def change do
    create table(:auth_access) do
      add(:group_id, :integer, null: false, default: 0)
      add(:forum_id, :integer, null: false, default: 0)
      add(:auth_view, :integer, null: false, default: 0)
      add(:auth_read, :integer, null: false, default: 0)
      add(:auth_post, :integer, null: false, default: 0)
      add(:auth_reply, :integer, null: false, default: 0)

      timestamps()
    end

    create(unique_index(:auth_access, [:group_id, :forum_id]))
  end
end
