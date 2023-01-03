defmodule ApiWeb.UserGroupLiveTest do
  use ApiWeb.ConnCase

  import Phoenix.LiveViewTest
  import Api.Bbs.SchemaFixtures

  @create_attrs %{group_id: 42, user_id: 42, user_pending: 42}
  @update_attrs %{group_id: 43, user_id: 43, user_pending: 43}
  @invalid_attrs %{group_id: nil, user_id: nil, user_pending: nil}

  defp create_user_group(_) do
    user_group = user_group_fixture()
    %{user_group: user_group}
  end

  describe "Index" do
    setup [:create_user_group]

    test "lists all user_group", %{conn: conn} do
      {:ok, _index_live, html} = live(conn, Routes.user_group_index_path(conn, :index))

      assert html =~ "Listing User group"
    end

    test "saves new user_group", %{conn: conn} do
      {:ok, index_live, _html} = live(conn, Routes.user_group_index_path(conn, :index))

      assert index_live |> element("a", "New User group") |> render_click() =~
               "New User group"

      assert_patch(index_live, Routes.user_group_index_path(conn, :new))

      assert index_live
             |> form("#user_group-form", user_group: @invalid_attrs)
             |> render_change() =~ "can&#39;t be blank"

      {:ok, _, html} =
        index_live
        |> form("#user_group-form", user_group: @create_attrs)
        |> render_submit()
        |> follow_redirect(conn, Routes.user_group_index_path(conn, :index))

      assert html =~ "User group created successfully"
    end

    test "updates user_group in listing", %{conn: conn, user_group: user_group} do
      {:ok, index_live, _html} = live(conn, Routes.user_group_index_path(conn, :index))

      assert index_live |> element("#user_group-#{user_group.id} a", "Edit") |> render_click() =~
               "Edit User group"

      assert_patch(index_live, Routes.user_group_index_path(conn, :edit, user_group))

      assert index_live
             |> form("#user_group-form", user_group: @invalid_attrs)
             |> render_change() =~ "can&#39;t be blank"

      {:ok, _, html} =
        index_live
        |> form("#user_group-form", user_group: @update_attrs)
        |> render_submit()
        |> follow_redirect(conn, Routes.user_group_index_path(conn, :index))

      assert html =~ "User group updated successfully"
    end

    test "deletes user_group in listing", %{conn: conn, user_group: user_group} do
      {:ok, index_live, _html} = live(conn, Routes.user_group_index_path(conn, :index))

      assert index_live |> element("#user_group-#{user_group.id} a", "Delete") |> render_click()
      refute has_element?(index_live, "#user_group-#{user_group.id}")
    end
  end

  describe "Show" do
    setup [:create_user_group]

    test "displays user_group", %{conn: conn, user_group: user_group} do
      {:ok, _show_live, html} = live(conn, Routes.user_group_show_path(conn, :show, user_group))

      assert html =~ "Show User group"
    end

    test "updates user_group within modal", %{conn: conn, user_group: user_group} do
      {:ok, show_live, _html} = live(conn, Routes.user_group_show_path(conn, :show, user_group))

      assert show_live |> element("a", "Edit") |> render_click() =~
               "Edit User group"

      assert_patch(show_live, Routes.user_group_show_path(conn, :edit, user_group))

      assert show_live
             |> form("#user_group-form", user_group: @invalid_attrs)
             |> render_change() =~ "can&#39;t be blank"

      {:ok, _, html} =
        show_live
        |> form("#user_group-form", user_group: @update_attrs)
        |> render_submit()
        |> follow_redirect(conn, Routes.user_group_show_path(conn, :show, user_group))

      assert html =~ "User group updated successfully"
    end
  end
end
