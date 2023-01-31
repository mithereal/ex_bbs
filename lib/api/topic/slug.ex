defmodule Api.Forum.Topics.TitleSlug do
  use EctoAutoslugField.Slug, from: :title, to: :slug
end