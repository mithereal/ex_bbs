defmodule Api.Forum.Categories do
  use Api.Schema
  import Ecto.Changeset

  alias Api.Forum.Forums

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
    |> validate_required([:title, :description])
  end
end
