defmodule ApiWeb.ForumsControllerTest do
  use ApiWeb.ConnCase

  import Api.ForumFixtures

  @create_attrs %{
    description: "some description",
    id: "7488a646-e31f-11e4-aace-600308960662",
    order: 42,
    status: 42,
    title: "some title"
  }
  @update_attrs %{
    description: "some updated description",
    id: "7488a646-e31f-11e4-aace-600308960668",
    order: 43,
    status: 43,
    title: "some updated title"
  }
  @invalid_attrs %{description: nil, id: nil, order: nil, status: nil, title: nil}

  describe "index" do
    test "lists all forums", %{conn: conn} do
      conn = get(conn, Routes.forums_path(conn, :index))
      assert html_response(conn, 200) =~ "Listing Forums"
    end
  end

  describe "new forums" do
    test "renders form", %{conn: conn} do
      conn = get(conn, Routes.forums_path(conn, :new))
      assert html_response(conn, 200) =~ "New Forums"
    end
  end

  describe "create forums" do
    test "redirects to show when data is valid", %{conn: conn} do
      conn = post(conn, Routes.forums_path(conn, :create), forums: @create_attrs)

      assert %{id: id} = redirected_params(conn)
      assert redirected_to(conn) == Routes.forums_path(conn, :show, id)

      conn = get(conn, Routes.forums_path(conn, :show, id))
      assert html_response(conn, 200) =~ "Show Forums"
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post(conn, Routes.forums_path(conn, :create), forums: @invalid_attrs)
      assert html_response(conn, 200) =~ "New Forums"
    end
  end

  describe "edit forums" do
    setup [:create_forums]

    test "renders form for editing chosen forums", %{conn: conn, forums: forums} do
      conn = get(conn, Routes.forums_path(conn, :edit, forums))
      assert html_response(conn, 200) =~ "Edit Forums"
    end
  end

  describe "update forums" do
    setup [:create_forums]

    test "redirects when data is valid", %{conn: conn, forums: forums} do
      conn = put(conn, Routes.forums_path(conn, :update, forums), forums: @update_attrs)
      assert redirected_to(conn) == Routes.forums_path(conn, :show, forums)

      conn = get(conn, Routes.forums_path(conn, :show, forums))
      assert html_response(conn, 200) =~ "some updated description"
    end

    test "renders errors when data is invalid", %{conn: conn, forums: forums} do
      conn = put(conn, Routes.forums_path(conn, :update, forums), forums: @invalid_attrs)
      assert html_response(conn, 200) =~ "Edit Forums"
    end
  end

  describe "delete forums" do
    setup [:create_forums]

    test "deletes chosen forums", %{conn: conn, forums: forums} do
      conn = delete(conn, Routes.forums_path(conn, :delete, forums))
      assert redirected_to(conn) == Routes.forums_path(conn, :index)

      assert_error_sent 404, fn ->
        get(conn, Routes.forums_path(conn, :show, forums))
      end
    end
  end

  defp create_forums(_) do
    forums = forums_fixture()
    %{forums: forums}
  end
end
