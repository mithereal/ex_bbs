defmodule Api.Forum.Posts do
  use Api.Schema
  import Ecto.Changeset

  alias Api.Forum.Topics
  alias Api.Accounts.User
  alias Api.Forum.Forums
  alias Api.Forum.Posts.TitleSlug
  alias Api.System.Status

  schema "bbs_posts" do
    field :body, :string
    field :description, :string
    field :edit_count, :integer, default: 0
    field :title, :string
    field :username, :string

    field :slug, TitleSlug.Type

    belongs_to :status, Status, foreign_key: :status_id
    belongs_to :forums, Forums, foreign_key: :forum_id
    belongs_to :topics, Topics, foreign_key: :topic_id
    belongs_to :users, User, foreign_key: :user_id

    timestamps()
  end

  @doc false
  def changeset(posts, attrs) do
    posts
    |> cast(attrs, [:title, :description, :username, :edit_count, :body])
    |> put_change(:username, attrs.user.username)
    |> put_assoc(:topics, attrs.topic)
    |> put_assoc(:users, attrs.user)
    |> put_assoc(:forums, attrs.forum)
    |> unique_constraint(:title)
    |> TitleSlug.maybe_generate_slug()
    |> TitleSlug.unique_constraint()
    |> validate_required([:title, :description, :body])

  end
end
