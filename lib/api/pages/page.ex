defmodule Api.Pages.Page do
  use Api.Schema
  import Ecto.Changeset

  alias Api.Pages.Page.TitleSlug

  schema "bbs_pages" do
    field :title, :string
    field :content, :string

    field :slug, TitleSlug.Type

    timestamps()
  end

  @doc false
  def changeset(page, attrs) do
    page
    |> cast(attrs, [:title, :content])
    |> validate_required([:title, :content])
    |> unique_constraint(:title)
    |> TitleSlug.maybe_generate_slug()
    |> TitleSlug.unique_constraint()
  end
end
