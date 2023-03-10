defmodule Api.Categories do
  @moduledoc """
  The Categories context.
  """
  alias Api.Categories.Category
  import Ecto.Query, warn: false

  def online_categories do
    Categories |> order_by(desc: :order) |> Repo.all()
  end

  def online_categories_data do
    Categories |> order_by(desc: :order) |> Repo.all()
  end
end
