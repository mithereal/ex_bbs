defmodule Api.Teams.TitleSlug do
  use EctoAutoslugField.Slug, from: :title, to: :slug
end
