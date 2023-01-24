defmodule Api.Forum.Posts.TitleSlug do
  use EctoAutoslugField.Slug, from: :title, to: :slug
end

defmodule Api.Forum.Topics.TitleSlug do
  use EctoAutoslugField.Slug, from: :title, to: :slug
end
