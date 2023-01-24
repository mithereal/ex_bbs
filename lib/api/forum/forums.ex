defmodule Api.Forum.Forums do
  use Api.Schema
  import Ecto.Changeset
  alias Api.Forum.Categories
  alias Api.Forum.Topics
  alias Api.Forum.Forums.TitleSlug

  schema "bbs_forums" do
    field :description, :string
    field :order, :integer
    field :status, :integer
    field :title, :string

    belongs_to :categories, Categories
    has_many :topics, Topics

    field :slug, TitleSlug.Type

    timestamps()
  end

  @doc false
  def changeset(forums, attrs) do
    forums
    |> cast(attrs, [:id, :title, :description, :status, :order, :category])
    |> cast_assoc(:topics, required: false)
    |> put_assoc(:categories, required: false)
    |> unique_constraint(:title)
    |> TitleSlug.maybe_generate_slug()
    |> TitleSlug.unique_constraint()
    |> validate_required([:title, :description])
  end
end
