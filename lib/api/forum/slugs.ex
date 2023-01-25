defmodule Api.Forum.Posts.TitleSlug do
  use EctoAutoslugField.Slug, from: :title, to: :slug
end

defmodule Api.Forum.Topics.TitleSlug do
  use EctoAutoslugField.Slug, from: :title, to: :slug
end

defmodule Api.Forum.Categories.TitleSlug do
  use EctoAutoslugField.Slug, from: :title, to: :slug
end

defmodule Api.Forum.Forums.TitleSlug do
  use EctoAutoslugField.Slug, from: :title, to: :slug
end
