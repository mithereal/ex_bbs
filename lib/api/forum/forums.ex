defmodule Api.Forum.Forums do
  use Api.Schema
  import Ecto.Changeset
  alias Api.Forum.Categories
  alias Api.Forum.Forums.TitleSlug
  alias Api.Forum.Topics

  schema "bbs_forums" do
    field :description, :string
    field :order, :integer
    field :status, :integer
    field :title, :string

    belongs_to :categories, Categories, foreign_key: :category_id
    has_many :topics, Topics, related_key: :topic_id

    field :slug, TitleSlug.Type

    timestamps()
  end

  @doc false
  def changeset(forums, attrs) do
    forums
    |> cast(attrs, [:id, :title, :description, :status, :order])
    |> cast_assoc(:topics, required: false, with: &Topics.changeset/2)
    |> put_assoc(:categories, attrs.category)
    |> unique_constraint(:title)
    |> TitleSlug.maybe_generate_slug()
    |> TitleSlug.unique_constraint()
    |> validate_required([:title, :description])
  end
end

