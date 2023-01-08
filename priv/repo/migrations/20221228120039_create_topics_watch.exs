defmodule Api.Repo.Migrations.CreateTopicsWatch do
  use Ecto.Migration

  def change do
    create table(:bbs_topics_watch) do
      add(:topic_id, references(:bbs_forums, on_delete: :nothing))
      add(:user_id, references(:bbs_users, on_delete: :nothing))
    end

  end
end
