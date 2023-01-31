defmodule Api.Categories.TitleSlug do
  use EctoAutoslugField.Slug, from: :title, to: :slug
end
