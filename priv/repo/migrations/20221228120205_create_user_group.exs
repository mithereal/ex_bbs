defmodule Api.Repo.Migrations.CreateUserGroup do
  use Ecto.Migration

  def change do
    create table(:bbs_user_group) do
      add(:group_id, references(:bbs_groups, on_delete: :nothing, type: :uuid))
      add(:user_id, references(:bbs_users, on_delete: :nothing, type: :uuid))
    end
  end
end
