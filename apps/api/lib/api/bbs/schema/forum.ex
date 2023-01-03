defmodule Api.Bbs.Schema.Forum do
  use Ecto.Schema
  import Ecto.Changeset

  schema "forums" do
    field :auth_announce, :integer
    field :auth_attachments, :integer
    field :auth_delete, :integer
    field :auth_edit, :integer
    field :auth_pollcreate, :integer
    field :auth_post, :integer
    field :auth_read, :integer
    field :auth_reply, :integer
    field :auth_sticky, :integer
    field :auth_view, :integer
    field :auth_vote, :integer
    field :cat_id, :integer
    field :forum_desc, :string
    field :forum_id, :integer
    field :forum_last_post_id, :integer
    field :forum_name, :string
    field :forum_order, :integer
    field :forum_posts, :integer
    field :forum_status, :integer
    field :forum_topics, :integer
    field :prune_enable, :integer
    field :prune_next, :integer

    timestamps()
  end

  @doc false
  def changeset(forum, attrs) do
    forum
    |> cast(attrs, [:forum_id, :cat_id, :forum_name, :forum_desc, :forum_status, :forum_order, :forum_posts, :forum_topics, :forum_last_post_id, :prune_enable, :prune_next, :auth_view, :auth_read, :auth_post, :auth_reply, :auth_edit, :auth_delete, :auth_announce, :auth_sticky, :auth_pollcreate, :auth_vote, :auth_attachments])
    |> validate_required([:forum_id, :cat_id, :forum_name, :forum_desc, :forum_status, :forum_order, :forum_posts, :forum_topics, :forum_last_post_id, :prune_enable, :prune_next, :auth_view, :auth_read, :auth_post, :auth_reply, :auth_edit, :auth_delete, :auth_announce, :auth_sticky, :auth_pollcreate, :auth_vote, :auth_attachments])
  end
end
