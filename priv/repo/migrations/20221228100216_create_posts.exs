defmodule Api.Repo.Migrations.CreatePosts do
  use Ecto.Migration

  def change do
    create table(:bbs_posts) do
      add :username, :string
      add :edit_count, :integer
      add :title, :string
      add :description, :string
      add :body, :string

      add(:forum_id, references(:bbs_forums, on_delete: :nothing))
      add(:poster_id, references(:bbs_users, on_delete: :nothing))

      timestamps()
    end

  end
end
