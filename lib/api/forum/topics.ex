defmodule Api.Forum.Topics do
  use Api.Schema
  import Ecto.Changeset

  alias Api.Forum.Forums
  alias Api.Forum.Posts

  alias Api.Forum.Topics.TitleSlug

  schema "bbs_topics" do
    field :description, :string
    field :status, :integer
    field :title, :string

    belongs_to :forums, Forums,  foreign_key: :forum_id
    has_many :posts, Posts, related_key: :post_id

    field :slug, TitleSlug.Type

    timestamps()
  end

  @doc false
  def changeset(topics, attrs) do
    topics
    |> cast(attrs, [:id, :title, :description, :status])
    |> cast_assoc(:posts, required: false)
    |> put_assoc(:forums, required: false)
    |> unique_constraint(:title)
    |> TitleSlug.maybe_generate_slug()
    |> TitleSlug.unique_constraint()
    |> validate_required([:id, :title, :description, :status])
  end
end
