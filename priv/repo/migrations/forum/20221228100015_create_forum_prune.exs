defmodule Api.Repo.Migrations.CreateForumPrune do
  use Ecto.Migration

  def change do
    create table(:forum_prune) do
      add :prune_id, :integer
      add :forum_id, :integer
      add :prune_days, :integer
      add :prune_freq, :integer

      timestamps()
    end
  end
end
