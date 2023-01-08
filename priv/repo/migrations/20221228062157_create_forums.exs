defmodule Api.Repo.Migrations.CreateForums do
  use Ecto.Migration

  def change do
    create table(:bbs_forums) do
      add :id, :uuid, primary_key: true, null: false
      add :title, :string
      add :description, :string
      add :status, :integer
      add :order, :integer

      timestamps()
    end
  end

  alter table(:bbs_forums) do
    add(:user_id, references(:bbs_users, on_delete: :nothing))
    add(:category_id, references(:bbs_category, on_delete: :nothing))
    add(:posts, references(:bbs_posts, on_delete: :nothing))
    add(:topics, references(:bbs_topics, on_delete: :nothing))
  end
end
