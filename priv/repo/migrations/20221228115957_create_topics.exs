defmodule Api.Repo.Migrations.CreateTopics do
  use Ecto.Migration

  def change do
    create table(:bbs_topics) do
      add :id, :uuid, primary_key: true, null: false
      add :title, :string
      add :description, :string
      add :status, :integer
      add :type, :integer

      timestamps()
    end


    alter table(:bbs_topics) do
      add(:forum_id, references(:bbs_forums, on_delete: :nothing))
      add(:poster_id, references(:bbs_users, on_delete: :nothing))
      add(:first_post_id, references(:bbs_posts, on_delete: :nothing))
      add(:last_post_id, references(:bbs_posts, on_delete: :nothing))
    end
  end
end
