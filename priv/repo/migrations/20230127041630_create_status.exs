defmodule Api.Repo.Migrations.CreateStatus do
  use Ecto.Migration

  def change do
    create table(:bbs_status,  primary_key: false) do
      add :id, :uuid, primary_key: true
      add :title, :string
      add :type, :string
    end

    alter table(:bbs_posts) do
      add(:status_id, references(:bbs_status, on_delete: :nothing, type: :uuid))
    end

    alter table(:bbs_topics) do
      add(:status_id, references(:bbs_status, on_delete: :nothing, type: :uuid))
    end

    alter table(:bbs_forums) do
      add(:status_id, references(:bbs_status, on_delete: :nothing, type: :uuid))
    end
    alter table(:bbs_categories) do
      add(:status_id, references(:bbs_status, on_delete: :nothing, type: :uuid))
    end
  end
end
