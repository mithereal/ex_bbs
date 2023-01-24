defmodule Api.Forum.Categories do
  use Api.Schema
  import Ecto.Changeset
  import Ecto.Query

  alias Api.Forum.Categories
  alias Api.Forum.Forums
  alias Api.Repo

  schema "bbs_categories" do
    field :description, :string
    field :order, :integer
    field :status, :integer
    field :title, :string

    has_many :forums, Forums


    timestamps()
  end

  @doc false
  def changeset(categories, attrs) do
    categories
    |> cast(attrs, [:id, :title, :description, :status, :order])
    |> cast_assoc(:forums, required: false)
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
