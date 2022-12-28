defmodule Api.Repo.Migrations.CreateForums do
  use Ecto.Migration

  def change do
    create table(:forums) do
      add :forum_id, :integer
      add :cat_id, :integer
      add :forum_name, :string
      add :forum_desc, :string
      add :forum_status, :integer
      add :forum_order, :integer
      add :forum_posts, :integer
      add :forum_topics, :integer
      add :forum_last_post_id, :integer
      add :prune_enable, :integer
      add :prune_next, :integer
      add :auth_view, :integer
      add :auth_read, :integer
      add :auth_post, :integer
      add :auth_reply, :integer
      add :auth_edit, :integer
      add :auth_delete, :integer
      add :auth_announce, :integer
      add :auth_sticky, :integer
      add :auth_pollcreate, :integer
      add :auth_vote, :integer
      add :auth_attachments, :integer

      timestamps()
    end
  end
end
