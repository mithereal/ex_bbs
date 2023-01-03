defmodule ApiWeb.ForumPruneLiveTest do
  use ApiWeb.ConnCase

  import Phoenix.LiveViewTest
  import Api.Bbs.SchemaFixtures

  @create_attrs %{forum_id: 42, prune_days: 42, prune_freq: 42, prune_id: 42}
  @update_attrs %{forum_id: 43, prune_days: 43, prune_freq: 43, prune_id: 43}
  @invalid_attrs %{forum_id: nil, prune_days: nil, prune_freq: nil, prune_id: nil}

  defp create_forum_prune(_) do
    forum_prune = forum_prune_fixture()
    %{forum_prune: forum_prune}
  end

  describe "Index" do
    setup [:create_forum_prune]

    test "lists all forum_prune", %{conn: conn} do
      {:ok, _index_live, html} = live(conn, Routes.forum_prune_index_path(conn, :index))

      assert html =~ "Listing Forum prune"
    end

    test "saves new forum_prune", %{conn: conn} do
      {:ok, index_live, _html} = live(conn, Routes.forum_prune_index_path(conn, :index))

      assert index_live |> element("a", "New Forum prune") |> render_click() =~
               "New Forum prune"

      assert_patch(index_live, Routes.forum_prune_index_path(conn, :new))

      assert index_live
             |> form("#forum_prune-form", forum_prune: @invalid_attrs)
             |> render_change() =~ "can&#39;t be blank"

      {:ok, _, html} =
        index_live
        |> form("#forum_prune-form", forum_prune: @create_attrs)
        |> render_submit()
        |> follow_redirect(conn, Routes.forum_prune_index_path(conn, :index))

      assert html =~ "Forum prune created successfully"
    end

    test "updates forum_prune in listing", %{conn: conn, forum_prune: forum_prune} do
      {:ok, index_live, _html} = live(conn, Routes.forum_prune_index_path(conn, :index))

      assert index_live |> element("#forum_prune-#{forum_prune.id} a", "Edit") |> render_click() =~
               "Edit Forum prune"

      assert_patch(index_live, Routes.forum_prune_index_path(conn, :edit, forum_prune))

      assert index_live
             |> form("#forum_prune-form", forum_prune: @invalid_attrs)
             |> render_change() =~ "can&#39;t be blank"

      {:ok, _, html} =
        index_live
        |> form("#forum_prune-form", forum_prune: @update_attrs)
        |> render_submit()
        |> follow_redirect(conn, Routes.forum_prune_index_path(conn, :index))

      assert html =~ "Forum prune updated successfully"
    end

    test "deletes forum_prune in listing", %{conn: conn, forum_prune: forum_prune} do
      {:ok, index_live, _html} = live(conn, Routes.forum_prune_index_path(conn, :index))

      assert index_live |> element("#forum_prune-#{forum_prune.id} a", "Delete") |> render_click()
      refute has_element?(index_live, "#forum_prune-#{forum_prune.id}")
    end
  end

  describe "Show" do
    setup [:create_forum_prune]

    test "displays forum_prune", %{conn: conn, forum_prune: forum_prune} do
      {:ok, _show_live, html} = live(conn, Routes.forum_prune_show_path(conn, :show, forum_prune))

      assert html =~ "Show Forum prune"
    end

    test "updates forum_prune within modal", %{conn: conn, forum_prune: forum_prune} do
      {:ok, show_live, _html} = live(conn, Routes.forum_prune_show_path(conn, :show, forum_prune))

      assert show_live |> element("a", "Edit") |> render_click() =~
               "Edit Forum prune"

      assert_patch(show_live, Routes.forum_prune_show_path(conn, :edit, forum_prune))

      assert show_live
             |> form("#forum_prune-form", forum_prune: @invalid_attrs)
             |> render_change() =~ "can&#39;t be blank"

      {:ok, _, html} =
        show_live
        |> form("#forum_prune-form", forum_prune: @update_attrs)
        |> render_submit()
        |> follow_redirect(conn, Routes.forum_prune_show_path(conn, :show, forum_prune))

      assert html =~ "Forum prune updated successfully"
    end
  end
end
