defmodule Api.Repo.Migrations.CreatePosts do
  use Ecto.Migration

  def change do
    create table(:bbs_posts, primary_key: false) do
      add :id, :uuid, primary_key: true
      add :username, :string
      add :edit_count, :integer,  default: 0
      add :title, :string
      add :description, :string
      add :body, :string
      add :slug, :string
      add(:parent_id, :integer)
      add(:star_count, :integer)

      add(:topic_id, references(:bbs_topics, on_delete: :nothing, type: :uuid))
      add(:user_id, references(:bbs_users, on_delete: :nothing, type: :uuid))

      timestamps()
    end
  end
end
