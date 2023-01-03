defmodule Api.Bbs.Schema.TopicWatch do
  use Ecto.Schema
  import Ecto.Changeset

  schema "topics_watch" do
    field :notify_status, :integer
    field :topic_id, :integer
    field :user_id, :integer

    timestamps()
  end

  @doc false
  def changeset(topic_watch, attrs) do
    topic_watch
    |> cast(attrs, [:topic_id, :user_id, :notify_status])
    |> validate_required([:topic_id, :user_id, :notify_status])
  end
end
