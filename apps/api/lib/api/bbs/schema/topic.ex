defmodule Api.Bbs.Schema.Topic do
  use Ecto.Schema
  import Ecto.Changeset

  schema "topics" do
    field :forum_id, :integer
    field :topic_first_post_id, :integer
    field :topic_id, :integer
    field :topic_last_post_id, :integer
    field :topic_moved_id, :integer
    field :topic_poster, :integer
    field :topic_replies, :integer
    field :topic_status, :integer
    field :topic_time, :integer
    field :topic_title, :string
    field :topic_type, :integer
    field :topic_views, :integer
    field :topic_vote, :integer

    timestamps()
  end

  @doc false
  def changeset(topic, attrs) do
    topic
    |> cast(attrs, [:topic_id, :forum_id, :topic_title, :topic_poster, :topic_time, :topic_views, :topic_replies, :topic_status, :topic_vote, :topic_type, :topic_first_post_id, :topic_last_post_id, :topic_moved_id])
    |> validate_required([:topic_id, :forum_id, :topic_title, :topic_poster, :topic_time, :topic_views, :topic_replies, :topic_status, :topic_vote, :topic_type, :topic_first_post_id, :topic_last_post_id, :topic_moved_id])
  end
end
