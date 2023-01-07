defmodule Api.ImagesTest do
  use Api.DataCase

  alias Api.Products

  describe "images" do
    alias Api.Products.Image

    import Api.ProductsFixtures

    @invalid_attrs %{height: nil, name: nil, path: nil, size: nil, type: nil, width: nil}

    test "list_images/0 returns all images" do
      image = image_fixture()
      assert Products.list_images() == [image]
    end

    test "get_image!/1 returns the image with given id" do
      image = image_fixture()
      assert Products.get_image!(image.id) == image
    end

    test "create_image/1 with valid data creates a image" do
      valid_attrs = %{
        height: 120.5,
        name: "some name",
        path: "some path",
        size: "some size",
        type: "some type",
        width: 120.5
      }

      assert {:ok, %Image{} = image} = Products.create_image(valid_attrs)
      assert image.height == 120.5
      assert image.name == "some name"
      assert image.path == "some path"
      assert image.size == "some size"
      assert image.type == "some type"
      assert image.width == 120.5
    end

    test "create_image/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Products.create_image(@invalid_attrs)
    end

    test "update_image/2 with valid data updates the image" do
      image = image_fixture()

      update_attrs = %{
        height: 456.7,
        name: "some updated name",
        path: "some updated path",
        size: "some updated size",
        type: "some updated type",
        width: 456.7
      }

      assert {:ok, %Image{} = image} = Products.update_image(image, update_attrs)
      assert image.height == 456.7
      assert image.name == "some updated name"
      assert image.path == "some updated path"
      assert image.size == "some updated size"
      assert image.type == "some updated type"
      assert image.width == 456.7
    end

    test "update_image/2 with invalid data returns error changeset" do
      image = image_fixture()
      assert {:error, %Ecto.Changeset{}} = Products.update_image(image, @invalid_attrs)
      assert image == Products.get_image!(image.id)
    end

    test "delete_image/1 deletes the image" do
      image = image_fixture()
      assert {:ok, %Image{}} = Products.delete_image(image)
      assert_raise Ecto.NoResultsError, fn -> Products.get_image!(image.id) end
    end

    test "change_image/1 returns a image changeset" do
      image = image_fixture()
      assert %Ecto.Changeset{} = Products.change_image(image)
    end
  end
end
