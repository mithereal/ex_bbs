defmodule Api.Repo.Migrations.CreatePostsText do
  use Ecto.Migration

  def change do
    create table(:posts_text) do
      add :post_id, :integer
      add :bbcode_uid, :string
      add :post_subject, :string
      add :post_text, :string

      timestamps()
    end
  end
end
