defmodule Api.Repo.Migrations.CreateTopics do
  use Ecto.Migration

  def change do
    create table(:bbs_topics, primary_key: false) do
      add :id, :uuid, primary_key: true
      add :title, :string
      add :description, :string
      add :type, :integer
      add :slug, :string

      add(:forum_id, references(:bbs_forums, on_delete: :nothing, type: :uuid))
      add(:user_id, references(:bbs_users, on_delete: :nothing, type: :uuid))
      add(:category_id, references(:bbs_categories, on_delete: :nothing, type: :uuid))

      add(:visit_count, :integer)
      add(:reply_count, :integer)
      add(:last_reply_id, :integer)
      add(:last_reply_user_id, :integer)
      add(:replied_at, :naive_datetime)
      add(:suggested_at, :naive_datetime)
      add(:star_count, :integer)


      timestamps()
    end

    create(index(:topics, [:user_id]))

    alter table(:bbs_posts) do
      add(:topic_id, references(:bbs_topics, on_delete: :nothing, type: :uuid))
    end
  end
end
