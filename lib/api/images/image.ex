defmodule Api.Images.Image do
  use Api.Schema
  import Ecto.Changeset

  alias Api.Images.Image.TitleSlug

  schema "bbs_images" do
    field(:height, :float)
    field(:title, :string)
    field(:description, :string)
    field(:path, :string)
    field(:size, :string)
    field(:type, :string)
    field(:width, :float)

    field :slug, TitleSlug.Type

    timestamps()
  end

  @doc false
  def changeset(image, attrs) do
    image
    |> cast(attrs, [:path, :size, :description, :type, :width, :height])
    |> unique_constraint(:title)
    |> TitleSlug.maybe_generate_slug()
    |> TitleSlug.unique_constraint()
    |> validate_required([:path, :size, :name, :type, :width, :height])
  end
end
