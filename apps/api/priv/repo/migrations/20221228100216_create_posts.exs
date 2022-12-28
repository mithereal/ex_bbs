defmodule Api.Repo.Migrations.CreatePosts do
  use Ecto.Migration

  def change do
    create table(:posts) do
      add :post_id, :integer
      add :topic_id, :integer
      add :forum_id, :integer
      add :poster_id, :integer
      add :post_time, :integer
      add :post_username, :string
      add :poster_ip, :string
      add :enable_bbcode, :integer
      add :enable_html, :integer
      add :enable_smilies, :integer
      add :enable_sig, :integer
      add :post_edit_time, :integer
      add :post_edit_count, :integer

      timestamps()
    end
  end
end
