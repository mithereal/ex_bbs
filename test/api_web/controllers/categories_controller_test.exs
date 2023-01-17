defmodule ApiWeb.CategoriesControllerTest do
  use ApiWeb.ConnCase

  import Api.ForumFixtures

  @create_attrs %{description: "some description", id: "7488a646-e31f-11e4-aace-600308960662", order: 42, status: 42, title: "some title"}
  @update_attrs %{description: "some updated description", id: "7488a646-e31f-11e4-aace-600308960668", order: 43, status: 43, title: "some updated title"}
  @invalid_attrs %{description: nil, id: nil, order: nil, status: nil, title: nil}

  describe "index" do
    test "lists all categories", %{conn: conn} do
      conn = get(conn, Routes.categories_path(conn, :index))
      assert html_response(conn, 200) =~ "Listing Categories"
    end
  end

  describe "new categories" do
    test "renders form", %{conn: conn} do
      conn = get(conn, Routes.categories_path(conn, :new))
      assert html_response(conn, 200) =~ "New Categories"
    end
  end

  describe "create categories" do
    test "redirects to show when data is valid", %{conn: conn} do
      conn = post(conn, Routes.categories_path(conn, :create), categories: @create_attrs)

      assert %{id: id} = redirected_params(conn)
      assert redirected_to(conn) == Routes.categories_path(conn, :show, id)

      conn = get(conn, Routes.categories_path(conn, :show, id))
      assert html_response(conn, 200) =~ "Show Categories"
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post(conn, Routes.categories_path(conn, :create), categories: @invalid_attrs)
      assert html_response(conn, 200) =~ "New Categories"
    end
  end

  describe "edit categories" do
    setup [:create_categories]

    test "renders form for editing chosen categories", %{conn: conn, categories: categories} do
      conn = get(conn, Routes.categories_path(conn, :edit, categories))
      assert html_response(conn, 200) =~ "Edit Categories"
    end
  end

  describe "update categories" do
    setup [:create_categories]

    test "redirects when data is valid", %{conn: conn, categories: categories} do
      conn = put(conn, Routes.categories_path(conn, :update, categories), categories: @update_attrs)
      assert redirected_to(conn) == Routes.categories_path(conn, :show, categories)

      conn = get(conn, Routes.categories_path(conn, :show, categories))
      assert html_response(conn, 200) =~ "some updated description"
    end

    test "renders errors when data is invalid", %{conn: conn, categories: categories} do
      conn = put(conn, Routes.categories_path(conn, :update, categories), categories: @invalid_attrs)
      assert html_response(conn, 200) =~ "Edit Categories"
    end
  end

  describe "delete categories" do
    setup [:create_categories]

    test "deletes chosen categories", %{conn: conn, categories: categories} do
      conn = delete(conn, Routes.categories_path(conn, :delete, categories))
      assert redirected_to(conn) == Routes.categories_path(conn, :index)

      assert_error_sent 404, fn ->
        get(conn, Routes.categories_path(conn, :show, categories))
      end
    end
  end

  defp create_categories(_) do
    categories = categories_fixture()
    %{categories: categories}
  end
end
