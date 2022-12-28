defmodule Api.Repo.Migrations.CreateTopics do
  use Ecto.Migration

  def change do
    create table(:topics) do
      add :topic_id, :integer
      add :forum_id, :integer
      add :topic_title, :string
      add :topic_poster, :integer
      add :topic_time, :integer
      add :topic_views, :integer
      add :topic_replies, :integer
      add :topic_status, :integer
      add :topic_vote, :integer
      add :topic_type, :integer
      add :topic_first_post_id, :integer
      add :topic_last_post_id, :integer
      add :topic_moved_id, :integer

      timestamps()
    end
  end
end
