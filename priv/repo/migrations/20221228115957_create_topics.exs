defmodule Api.Repo.Migrations.CreateTopics do
  use Ecto.Migration

  def change do
    create table(:bbs_topics, primary_key: false) do
      add :id, :uuid, primary_key: true
      add :title, :string
      add :description, :string
      add :status, :integer
      add :type, :integer

      add(:forum_id, references(:bbs_forums, on_delete: :nothing, type: :uuid))
      add(:poster_id, references(:bbs_users, on_delete: :nothing, type: :uuid))
      add(:first_post_id, references(:bbs_posts, on_delete: :nothing, type: :uuid))
      add(:last_post_id, references(:bbs_posts, on_delete: :nothing, type: :uuid))

      timestamps()
    end

    alter table(:bbs_posts) do
      add(:topic_id, references(:bbs_topics, on_delete: :nothing, type: :uuid))
    end
  end
end
