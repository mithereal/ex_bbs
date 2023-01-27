defmodule Api.Forum.Categories do
  use Api.Schema
  import Ecto.Changeset
  import Ecto.Query

  alias Api.Forum.Categories
  alias Api.Forum.Categories.TitleSlug
  alias Api.Forum.Forums
  alias Api.Repo
  alias Api.System.Status

  schema "bbs_categories" do
    field :description, :string
    field :order, :integer
    field :title, :string

    has_many :forums, Forums, foreign_key: :forum_id

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

  def online_categories do
    Categories |> order_by(desc: :order) |> Repo.all()
  end

  def online_categories_data do
    Categories |> order_by(desc: :order) |> Repo.all()
  end
end
