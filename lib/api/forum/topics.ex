defmodule Api.Forum.Topics do
  use Api.Schema
  import Ecto.Changeset

  alias Api.Forum.Forums
  alias Api.Forum.Posts
  alias Api.Forum.Categories
  alias Api.Accounts.User

  alias Api.Forum.Topics.TitleSlug
  alias Api.System.Status

  schema "bbs_topics" do
    field :description, :string
    field :title, :string

    belongs_to :status, Status, foreign_key: :status_id
    belongs_to :forums, Forums,  foreign_key: :forum_id
    has_many :posts, Posts, foreign_key: :post_id
    belongs_to :users, User, foreign_key: :user_id
    belongs_to :categories, Categories, foreign_key: :category_id

    field :slug, TitleSlug.Type

    timestamps()
  end

  @doc false
  def changeset(topics, attrs) do
    topics
    |> cast(attrs, [ :title, :description])
    |> cast_assoc(:posts,  required: false, with: &Posts.changeset/2)
    |> put_assoc(:forums, attrs.forum)
    |> put_assoc(:status, attrs.status)
    |> put_assoc(:users, attrs.user)
    |> unique_constraint(:title)
    |> TitleSlug.maybe_generate_slug()
    |> TitleSlug.unique_constraint()
    |> validate_required([ :title, :description])
  end
end
