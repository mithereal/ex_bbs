defmodule Api.ProductsFixtures do
  @moduledoc """
  This module defines test helpers for creating
  entities via the `Api.Products` context.
  """

  @doc """
  Generate a image.
  """
  def image_fixture(attrs \\ %{}) do
    {:ok, image} =
      attrs
      |> Enum.into(%{
        height: 120.5,
        name: "some name",
        path: "some path",
        size: "some size",
        type: "some type",
        width: 120.5
      })
      |> Api.Products.create_image()

    image
  end

  @doc """
  Generate a product.
  """
  def product_fixture(attrs \\ %{}) do
    {:ok, product} =
      attrs
      |> Enum.into(%{
        description: "some description",
        link: "some link",
        name: "some name",
        price: "120.5",
        type: "some type"
      })
      |> Api.Products.create_product()

    product
  end
end
