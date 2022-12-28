defmodule ApiWeb.ForumLiveTest do
  use ApiWeb.ConnCase

  import Phoenix.LiveViewTest
  import Api.DatabaseFixtures

  @create_attrs %{auth_announce: 42, auth_attachments: 42, auth_delete: 42, auth_edit: 42, auth_pollcreate: 42, auth_post: 42, auth_read: 42, auth_reply: 42, auth_sticky: 42, auth_view: 42, auth_vote: 42, cat_id: 42, forum_desc: "some forum_desc", forum_id: 42, forum_last_post_id: 42, forum_name: "some forum_name", forum_order: 42, forum_posts: 42, forum_status: 42, forum_topics: 42, prune_enable: 42, prune_next: 42}
  @update_attrs %{auth_announce: 43, auth_attachments: 43, auth_delete: 43, auth_edit: 43, auth_pollcreate: 43, auth_post: 43, auth_read: 43, auth_reply: 43, auth_sticky: 43, auth_view: 43, auth_vote: 43, cat_id: 43, forum_desc: "some updated forum_desc", forum_id: 43, forum_last_post_id: 43, forum_name: "some updated forum_name", forum_order: 43, forum_posts: 43, forum_status: 43, forum_topics: 43, prune_enable: 43, prune_next: 43}
  @invalid_attrs %{auth_announce: nil, auth_attachments: nil, auth_delete: nil, auth_edit: nil, auth_pollcreate: nil, auth_post: nil, auth_read: nil, auth_reply: nil, auth_sticky: nil, auth_view: nil, auth_vote: nil, cat_id: nil, forum_desc: nil, forum_id: nil, forum_last_post_id: nil, forum_name: nil, forum_order: nil, forum_posts: nil, forum_status: nil, forum_topics: nil, prune_enable: nil, prune_next: nil}

  defp create_forum(_) do
    forum = forum_fixture()
    %{forum: forum}
  end

  describe "Index" do
    setup [:create_forum]

    test "lists all forums", %{conn: conn, forum: forum} do
      {:ok, _index_live, html} = live(conn, Routes.forum_index_path(conn, :index))

      assert html =~ "Listing Forums"
      assert html =~ forum.forum_desc
    end

    test "saves new forum", %{conn: conn} do
      {:ok, index_live, _html} = live(conn, Routes.forum_index_path(conn, :index))

      assert index_live |> element("a", "New Forum") |> render_click() =~
               "New Forum"

      assert_patch(index_live, Routes.forum_index_path(conn, :new))

      assert index_live
             |> form("#forum-form", forum: @invalid_attrs)
             |> render_change() =~ "can&#39;t be blank"

      {:ok, _, html} =
        index_live
        |> form("#forum-form", forum: @create_attrs)
        |> render_submit()
        |> follow_redirect(conn, Routes.forum_index_path(conn, :index))

      assert html =~ "Forum created successfully"
      assert html =~ "some forum_desc"
    end

    test "updates forum in listing", %{conn: conn, forum: forum} do
      {:ok, index_live, _html} = live(conn, Routes.forum_index_path(conn, :index))

      assert index_live |> element("#forum-#{forum.id} a", "Edit") |> render_click() =~
               "Edit Forum"

      assert_patch(index_live, Routes.forum_index_path(conn, :edit, forum))

      assert index_live
             |> form("#forum-form", forum: @invalid_attrs)
             |> render_change() =~ "can&#39;t be blank"

      {:ok, _, html} =
        index_live
        |> form("#forum-form", forum: @update_attrs)
        |> render_submit()
        |> follow_redirect(conn, Routes.forum_index_path(conn, :index))

      assert html =~ "Forum updated successfully"
      assert html =~ "some updated forum_desc"
    end

    test "deletes forum in listing", %{conn: conn, forum: forum} do
      {:ok, index_live, _html} = live(conn, Routes.forum_index_path(conn, :index))

      assert index_live |> element("#forum-#{forum.id} a", "Delete") |> render_click()
      refute has_element?(index_live, "#forum-#{forum.id}")
    end
  end

  describe "Show" do
    setup [:create_forum]

    test "displays forum", %{conn: conn, forum: forum} do
      {:ok, _show_live, html} = live(conn, Routes.forum_show_path(conn, :show, forum))

      assert html =~ "Show Forum"
      assert html =~ forum.forum_desc
    end

    test "updates forum within modal", %{conn: conn, forum: forum} do
      {:ok, show_live, _html} = live(conn, Routes.forum_show_path(conn, :show, forum))

      assert show_live |> element("a", "Edit") |> render_click() =~
               "Edit Forum"

      assert_patch(show_live, Routes.forum_show_path(conn, :edit, forum))

      assert show_live
             |> form("#forum-form", forum: @invalid_attrs)
             |> render_change() =~ "can&#39;t be blank"

      {:ok, _, html} =
        show_live
        |> form("#forum-form", forum: @update_attrs)
        |> render_submit()
        |> follow_redirect(conn, Routes.forum_show_path(conn, :show, forum))

      assert html =~ "Forum updated successfully"
      assert html =~ "some updated forum_desc"
    end
  end
end
