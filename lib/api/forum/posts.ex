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

    belongs_to :topics, Topics
    belongs_to :users, Users

    timestamps()
  end

  @doc false
  def changeset(posts, attrs) do
    posts
    |> cast(attrs, [:id, :title, :description, :status, :username, :edit_count, :body])
    |> put_assoc(:topics, required: false)
    |> put_assoc(:users, required: false)
    |> unique_constraint(:title)
    |> TitleSlug.maybe_generate_slug()
    |> TitleSlug.unique_constraint()
    |> validate_required([:id, :title, :description, :status, :username, :edit_count, :body])
  end
end
