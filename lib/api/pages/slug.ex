defmodule Api.Pages.Page.TitleSlug do
  use EctoAutoslugField.Slug, from: :title, to: :slug
end