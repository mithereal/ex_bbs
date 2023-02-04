defmodule Api.Topics.TitleSlug do
  use EctoAutoslugField.Slug, from: :title, to: :slug
end