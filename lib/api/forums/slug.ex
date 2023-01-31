defmodule Api.Forum.Forums.TitleSlug do
  use EctoAutoslugField.Slug, from: :title, to: :slug
end
