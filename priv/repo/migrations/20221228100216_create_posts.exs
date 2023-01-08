defmodule Api.Repo.Migrations.CreatePosts do
  use Ecto.Migration

  def change do
    create table(:bbs_posts) do
      add :id, :uuid, primary_key: true, null: false
      add :username, :string
      add :edit_count, :integer
      add :title, :string
      add :description, :string
      add :body, :string

      timestamps()
    end

    alter table(:bbs_posts) do
      add(:topic_id, references(:bbs_topics, on_delete: :nothing, null: true))
      add(:forum_id, references(:bbs_forums, on_delete: :nothing))
      add(:poster_id, references(:bbs_users, on_delete: :nothing))
    end
  end
end
