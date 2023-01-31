defmodule Api.Forum.Posts.TitleSlug do
  use EctoAutoslugField.Slug, from: :title, to: :slug
end
