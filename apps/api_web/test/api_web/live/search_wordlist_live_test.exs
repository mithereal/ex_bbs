defmodule ApiWeb.SearchWordlistLiveTest do
  use ApiWeb.ConnCase

  import Phoenix.LiveViewTest
  import Api.Bbs.SchemaFixtures

  @create_attrs %{word_common: "some word_common", word_id: 42, word_text: "some word_text"}
  @update_attrs %{word_common: "some updated word_common", word_id: 43, word_text: "some updated word_text"}
  @invalid_attrs %{word_common: nil, word_id: nil, word_text: nil}

  defp create_search_wordlist(_) do
    search_wordlist = search_wordlist_fixture()
    %{search_wordlist: search_wordlist}
  end

  describe "Index" do
    setup [:create_search_wordlist]

    test "lists all search_wordlist", %{conn: conn, search_wordlist: search_wordlist} do
      {:ok, _index_live, html} = live(conn, Routes.search_wordlist_index_path(conn, :index))

      assert html =~ "Listing Search wordlist"
      assert html =~ search_wordlist.word_common
    end

    test "saves new search_wordlist", %{conn: conn} do
      {:ok, index_live, _html} = live(conn, Routes.search_wordlist_index_path(conn, :index))

      assert index_live |> element("a", "New Search wordlist") |> render_click() =~
               "New Search wordlist"

      assert_patch(index_live, Routes.search_wordlist_index_path(conn, :new))

      assert index_live
             |> form("#search_wordlist-form", search_wordlist: @invalid_attrs)
             |> render_change() =~ "can&#39;t be blank"

      {:ok, _, html} =
        index_live
        |> form("#search_wordlist-form", search_wordlist: @create_attrs)
        |> render_submit()
        |> follow_redirect(conn, Routes.search_wordlist_index_path(conn, :index))

      assert html =~ "Search wordlist created successfully"
      assert html =~ "some word_common"
    end

    test "updates search_wordlist in listing", %{conn: conn, search_wordlist: search_wordlist} do
      {:ok, index_live, _html} = live(conn, Routes.search_wordlist_index_path(conn, :index))

      assert index_live |> element("#search_wordlist-#{search_wordlist.id} a", "Edit") |> render_click() =~
               "Edit Search wordlist"

      assert_patch(index_live, Routes.search_wordlist_index_path(conn, :edit, search_wordlist))

      assert index_live
             |> form("#search_wordlist-form", search_wordlist: @invalid_attrs)
             |> render_change() =~ "can&#39;t be blank"

      {:ok, _, html} =
        index_live
        |> form("#search_wordlist-form", search_wordlist: @update_attrs)
        |> render_submit()
        |> follow_redirect(conn, Routes.search_wordlist_index_path(conn, :index))

      assert html =~ "Search wordlist updated successfully"
      assert html =~ "some updated word_common"
    end

    test "deletes search_wordlist in listing", %{conn: conn, search_wordlist: search_wordlist} do
      {:ok, index_live, _html} = live(conn, Routes.search_wordlist_index_path(conn, :index))

      assert index_live |> element("#search_wordlist-#{search_wordlist.id} a", "Delete") |> render_click()
      refute has_element?(index_live, "#search_wordlist-#{search_wordlist.id}")
    end
  end

  describe "Show" do
    setup [:create_search_wordlist]

    test "displays search_wordlist", %{conn: conn, search_wordlist: search_wordlist} do
      {:ok, _show_live, html} = live(conn, Routes.search_wordlist_show_path(conn, :show, search_wordlist))

      assert html =~ "Show Search wordlist"
      assert html =~ search_wordlist.word_common
    end

    test "updates search_wordlist within modal", %{conn: conn, search_wordlist: search_wordlist} do
      {:ok, show_live, _html} = live(conn, Routes.search_wordlist_show_path(conn, :show, search_wordlist))

      assert show_live |> element("a", "Edit") |> render_click() =~
               "Edit Search wordlist"

      assert_patch(show_live, Routes.search_wordlist_show_path(conn, :edit, search_wordlist))

      assert show_live
             |> form("#search_wordlist-form", search_wordlist: @invalid_attrs)
             |> render_change() =~ "can&#39;t be blank"

      {:ok, _, html} =
        show_live
        |> form("#search_wordlist-form", search_wordlist: @update_attrs)
        |> render_submit()
        |> follow_redirect(conn, Routes.search_wordlist_show_path(conn, :show, search_wordlist))

      assert html =~ "Search wordlist updated successfully"
      assert html =~ "some updated word_common"
    end
  end
end
