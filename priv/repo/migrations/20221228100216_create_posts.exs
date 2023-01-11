defmodule Api.Repo.Migrations.CreatePosts do
  use Ecto.Migration

  def change do
    create table(:bbs_posts, primary_key: false) do
      add :id, :uuid, primary_key: true
      add :username, :string
      add :edit_count, :integer
      add :title, :string
      add :description, :string
      add :body, :string

      add(:forum_id, references(:bbs_forums, on_delete: :nothing, type: :uuid))
      add(:poster_id, references(:bbs_users, on_delete: :nothing, type: :uuid))

      timestamps()
    end
  end
end
