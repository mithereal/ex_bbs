defmodule Api.Repo.Migrations.CreateBBSHitCounters do
  use Ecto.Migration

  def change do
    create table(:bbs_hit_counters) do
      add(:key, :string)
      add(:value, :integer)
      add(:group_id, references(:bbs_groups, on_delete: :nothing, type: :uuid))
      add(:user_id, references(:bbs_users, on_delete: :nothing, type: :uuid))
    end
  end
end
