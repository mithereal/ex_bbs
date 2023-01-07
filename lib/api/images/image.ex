defmodule Api.Images.Image do
  use Ecto.Schema
  import Ecto.Changeset

  schema "images" do
    field(:height, :float)
    field(:description, :string)
    field(:path, :string)
    field(:size, :string)
    field(:type, :string)
    field(:width, :float)

    timestamps()
  end

  @doc false
  def changeset(image, attrs) do
    image
    |> cast(attrs, [:path, :size, :description, :type, :width, :height])
    |> validate_required([:path, :size, :name, :type, :width, :height])
  end
end
