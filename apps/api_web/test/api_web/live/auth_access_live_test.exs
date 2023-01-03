defmodule ApiWeb.AuthAccessLiveTest do
  use ApiWeb.ConnCase

  import Phoenix.LiveViewTest
  import Api.Bbs.SchemaFixtures

  @create_attrs %{auth_post: 42, auth_read: 42, auth_reply: 42, auth_view: 42, forum_id: 42, group_id: 42}
  @update_attrs %{auth_post: 43, auth_read: 43, auth_reply: 43, auth_view: 43, forum_id: 43, group_id: 43}
  @invalid_attrs %{auth_post: nil, auth_read: nil, auth_reply: nil, auth_view: nil, forum_id: nil, group_id: nil}

  defp create_auth_access(_) do
    auth_access = auth_access_fixture()
    %{auth_access: auth_access}
  end

  describe "Index" do
    setup [:create_auth_access]

    test "lists all auth_access", %{conn: conn} do
      {:ok, _index_live, html} = live(conn, Routes.auth_access_index_path(conn, :index))

      assert html =~ "Listing Auth access"
    end

    test "saves new auth_access", %{conn: conn} do
      {:ok, index_live, _html} = live(conn, Routes.auth_access_index_path(conn, :index))

      assert index_live |> element("a", "New Auth access") |> render_click() =~
               "New Auth access"

      assert_patch(index_live, Routes.auth_access_index_path(conn, :new))

      assert index_live
             |> form("#auth_access-form", auth_access: @invalid_attrs)
             |> render_change() =~ "can&#39;t be blank"

      {:ok, _, html} =
        index_live
        |> form("#auth_access-form", auth_access: @create_attrs)
        |> render_submit()
        |> follow_redirect(conn, Routes.auth_access_index_path(conn, :index))

      assert html =~ "Auth access created successfully"
    end

    test "updates auth_access in listing", %{conn: conn, auth_access: auth_access} do
      {:ok, index_live, _html} = live(conn, Routes.auth_access_index_path(conn, :index))

      assert index_live |> element("#auth_access-#{auth_access.id} a", "Edit") |> render_click() =~
               "Edit Auth access"

      assert_patch(index_live, Routes.auth_access_index_path(conn, :edit, auth_access))

      assert index_live
             |> form("#auth_access-form", auth_access: @invalid_attrs)
             |> render_change() =~ "can&#39;t be blank"

      {:ok, _, html} =
        index_live
        |> form("#auth_access-form", auth_access: @update_attrs)
        |> render_submit()
        |> follow_redirect(conn, Routes.auth_access_index_path(conn, :index))

      assert html =~ "Auth access updated successfully"
    end

    test "deletes auth_access in listing", %{conn: conn, auth_access: auth_access} do
      {:ok, index_live, _html} = live(conn, Routes.auth_access_index_path(conn, :index))

      assert index_live |> element("#auth_access-#{auth_access.id} a", "Delete") |> render_click()
      refute has_element?(index_live, "#auth_access-#{auth_access.id}")
    end
  end

  describe "Show" do
    setup [:create_auth_access]

    test "displays auth_access", %{conn: conn, auth_access: auth_access} do
      {:ok, _show_live, html} = live(conn, Routes.auth_access_show_path(conn, :show, auth_access))

      assert html =~ "Show Auth access"
    end

    test "updates auth_access within modal", %{conn: conn, auth_access: auth_access} do
      {:ok, show_live, _html} = live(conn, Routes.auth_access_show_path(conn, :show, auth_access))

      assert show_live |> element("a", "Edit") |> render_click() =~
               "Edit Auth access"

      assert_patch(show_live, Routes.auth_access_show_path(conn, :edit, auth_access))

      assert show_live
             |> form("#auth_access-form", auth_access: @invalid_attrs)
             |> render_change() =~ "can&#39;t be blank"

      {:ok, _, html} =
        show_live
        |> form("#auth_access-form", auth_access: @update_attrs)
        |> render_submit()
        |> follow_redirect(conn, Routes.auth_access_show_path(conn, :show, auth_access))

      assert html =~ "Auth access updated successfully"
    end
  end
end
