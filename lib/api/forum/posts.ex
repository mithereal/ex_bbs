defmodule Api.Forum.Posts do
  use Api.Schema
  import Ecto.Changeset

  alias Api.Forum.Topics
  alias Api.Forum.Users
  alias Api.Forum.Posts.TitleSlug

  schema "bbs_posts" do
    field :body, :string
    field :description, :string
    field :edit_count, :integer
    field :status, :integer
    field :title, :string
    field :username, :string

    field :slug, TitleSlug.Type

    belongs_to :topics, Topics, foreign_key: :topic_id
    belongs_to :users, Users, foreign_key: :user_id

    timestamps()
  end

  @doc false
  def changeset(posts, attrs) do
    posts
    |> cast(attrs, [:id, :title, :description, :status, :username, :edit_count, :body])
    |> put_assoc(:topics, attrs.topic)
    |> put_assoc(:users,  attrs.user)
    |> unique_constraint(:title)
    |> TitleSlug.maybe_generate_slug()
    |> TitleSlug.unique_constraint()
    |> validate_required([:id, :title, :description, :status, :username, :edit_count, :body])
  end
end
