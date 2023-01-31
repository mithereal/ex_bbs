defmodule Api.Categories.Category do
  use Api.Schema
  import Ecto.Changeset
  import Ecto.Query

  alias Api.Categories
  alias Api.Categories.TitleSlug
  alias Api.Forum.Forums
  alias Api.Repo
  alias Api.System.Status

  schema "bbs_categories" do
    field :description, :string
    field :order, :integer
    field :title, :string

    belongs_to :parent, Categories, foreign_key: :parent_id
    has_many :forums, Forums, foreign_key: :forum_id
    has_many :children, Categories, foreign_key: :parent_id

    field :slug, TitleSlug.Type

    belongs_to :status, Status, foreign_key: :status_id


    timestamps()
  end

  @doc false
  def changeset(categories, attrs) do
    categories
    |> cast(attrs, [ :title, :description,  :order])
    |> cast_assoc(:forums, required: false)
    |> put_assoc(:status, attrs.status)
    |> unique_constraint(:title)
    |> TitleSlug.maybe_generate_slug()
    |> TitleSlug.unique_constraint()
    |> validate_required([:title, :description])
  end

end
