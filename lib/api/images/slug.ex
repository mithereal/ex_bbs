defmodule Api.Images.Image.TitleSlug do
  use EctoAutoslugField.Slug, from: :title, to: :slug
end
