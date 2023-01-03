defmodule ApiWeb.SearchWordmatchLiveTest do
  use ApiWeb.ConnCase

  import Phoenix.LiveViewTest
  import Api.Bbs.SchemaFixtures

  @create_attrs %{post_id: 42, title_match: 42, word_id: 42}
  @update_attrs %{post_id: 43, title_match: 43, word_id: 43}
  @invalid_attrs %{post_id: nil, title_match: nil, word_id: nil}

  defp create_search_wordmatch(_) do
    search_wordmatch = search_wordmatch_fixture()
    %{search_wordmatch: search_wordmatch}
  end

  describe "Index" do
    setup [:create_search_wordmatch]

    test "lists all search_wordmatch", %{conn: conn} do
      {:ok, _index_live, html} = live(conn, Routes.search_wordmatch_index_path(conn, :index))

      assert html =~ "Listing Search wordmatch"
    end

    test "saves new search_wordmatch", %{conn: conn} do
      {:ok, index_live, _html} = live(conn, Routes.search_wordmatch_index_path(conn, :index))

      assert index_live |> element("a", "New Search wordmatch") |> render_click() =~
               "New Search wordmatch"

      assert_patch(index_live, Routes.search_wordmatch_index_path(conn, :new))

      assert index_live
             |> form("#search_wordmatch-form", search_wordmatch: @invalid_attrs)
             |> render_change() =~ "can&#39;t be blank"

      {:ok, _, html} =
        index_live
        |> form("#search_wordmatch-form", search_wordmatch: @create_attrs)
        |> render_submit()
        |> follow_redirect(conn, Routes.search_wordmatch_index_path(conn, :index))

      assert html =~ "Search wordmatch created successfully"
    end

    test "updates search_wordmatch in listing", %{conn: conn, search_wordmatch: search_wordmatch} do
      {:ok, index_live, _html} = live(conn, Routes.search_wordmatch_index_path(conn, :index))

      assert index_live |> element("#search_wordmatch-#{search_wordmatch.id} a", "Edit") |> render_click() =~
               "Edit Search wordmatch"

      assert_patch(index_live, Routes.search_wordmatch_index_path(conn, :edit, search_wordmatch))

      assert index_live
             |> form("#search_wordmatch-form", search_wordmatch: @invalid_attrs)
             |> render_change() =~ "can&#39;t be blank"

      {:ok, _, html} =
        index_live
        |> form("#search_wordmatch-form", search_wordmatch: @update_attrs)
        |> render_submit()
        |> follow_redirect(conn, Routes.search_wordmatch_index_path(conn, :index))

      assert html =~ "Search wordmatch updated successfully"
    end

    test "deletes search_wordmatch in listing", %{conn: conn, search_wordmatch: search_wordmatch} do
      {:ok, index_live, _html} = live(conn, Routes.search_wordmatch_index_path(conn, :index))

      assert index_live |> element("#search_wordmatch-#{search_wordmatch.id} a", "Delete") |> render_click()
      refute has_element?(index_live, "#search_wordmatch-#{search_wordmatch.id}")
    end
  end

  describe "Show" do
    setup [:create_search_wordmatch]

    test "displays search_wordmatch", %{conn: conn, search_wordmatch: search_wordmatch} do
      {:ok, _show_live, html} = live(conn, Routes.search_wordmatch_show_path(conn, :show, search_wordmatch))

      assert html =~ "Show Search wordmatch"
    end

    test "updates search_wordmatch within modal", %{conn: conn, search_wordmatch: search_wordmatch} do
      {:ok, show_live, _html} = live(conn, Routes.search_wordmatch_show_path(conn, :show, search_wordmatch))

      assert show_live |> element("a", "Edit") |> render_click() =~
               "Edit Search wordmatch"

      assert_patch(show_live, Routes.search_wordmatch_show_path(conn, :edit, search_wordmatch))

      assert show_live
             |> form("#search_wordmatch-form", search_wordmatch: @invalid_attrs)
             |> render_change() =~ "can&#39;t be blank"

      {:ok, _, html} =
        show_live
        |> form("#search_wordmatch-form", search_wordmatch: @update_attrs)
        |> render_submit()
        |> follow_redirect(conn, Routes.search_wordmatch_show_path(conn, :show, search_wordmatch))

      assert html =~ "Search wordmatch updated successfully"
    end
  end
end
