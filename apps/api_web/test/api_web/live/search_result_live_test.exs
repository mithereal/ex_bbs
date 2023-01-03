defmodule ApiWeb.SearchResultLiveTest do
  use ApiWeb.ConnCase

  import Phoenix.LiveViewTest
  import Api.Bbs.SchemaFixtures

  @create_attrs %{search_array: "some search_array", search_id: 42, search_time: 42, session_id: 42}
  @update_attrs %{search_array: "some updated search_array", search_id: 43, search_time: 43, session_id: 43}
  @invalid_attrs %{search_array: nil, search_id: nil, search_time: nil, session_id: nil}

  defp create_search_result(_) do
    search_result = search_result_fixture()
    %{search_result: search_result}
  end

  describe "Index" do
    setup [:create_search_result]

    test "lists all search_results", %{conn: conn, search_result: search_result} do
      {:ok, _index_live, html} = live(conn, Routes.search_result_index_path(conn, :index))

      assert html =~ "Listing Search results"
      assert html =~ search_result.search_array
    end

    test "saves new search_result", %{conn: conn} do
      {:ok, index_live, _html} = live(conn, Routes.search_result_index_path(conn, :index))

      assert index_live |> element("a", "New Search result") |> render_click() =~
               "New Search result"

      assert_patch(index_live, Routes.search_result_index_path(conn, :new))

      assert index_live
             |> form("#search_result-form", search_result: @invalid_attrs)
             |> render_change() =~ "can&#39;t be blank"

      {:ok, _, html} =
        index_live
        |> form("#search_result-form", search_result: @create_attrs)
        |> render_submit()
        |> follow_redirect(conn, Routes.search_result_index_path(conn, :index))

      assert html =~ "Search result created successfully"
      assert html =~ "some search_array"
    end

    test "updates search_result in listing", %{conn: conn, search_result: search_result} do
      {:ok, index_live, _html} = live(conn, Routes.search_result_index_path(conn, :index))

      assert index_live |> element("#search_result-#{search_result.id} a", "Edit") |> render_click() =~
               "Edit Search result"

      assert_patch(index_live, Routes.search_result_index_path(conn, :edit, search_result))

      assert index_live
             |> form("#search_result-form", search_result: @invalid_attrs)
             |> render_change() =~ "can&#39;t be blank"

      {:ok, _, html} =
        index_live
        |> form("#search_result-form", search_result: @update_attrs)
        |> render_submit()
        |> follow_redirect(conn, Routes.search_result_index_path(conn, :index))

      assert html =~ "Search result updated successfully"
      assert html =~ "some updated search_array"
    end

    test "deletes search_result in listing", %{conn: conn, search_result: search_result} do
      {:ok, index_live, _html} = live(conn, Routes.search_result_index_path(conn, :index))

      assert index_live |> element("#search_result-#{search_result.id} a", "Delete") |> render_click()
      refute has_element?(index_live, "#search_result-#{search_result.id}")
    end
  end

  describe "Show" do
    setup [:create_search_result]

    test "displays search_result", %{conn: conn, search_result: search_result} do
      {:ok, _show_live, html} = live(conn, Routes.search_result_show_path(conn, :show, search_result))

      assert html =~ "Show Search result"
      assert html =~ search_result.search_array
    end

    test "updates search_result within modal", %{conn: conn, search_result: search_result} do
      {:ok, show_live, _html} = live(conn, Routes.search_result_show_path(conn, :show, search_result))

      assert show_live |> element("a", "Edit") |> render_click() =~
               "Edit Search result"

      assert_patch(show_live, Routes.search_result_show_path(conn, :edit, search_result))

      assert show_live
             |> form("#search_result-form", search_result: @invalid_attrs)
             |> render_change() =~ "can&#39;t be blank"

      {:ok, _, html} =
        show_live
        |> form("#search_result-form", search_result: @update_attrs)
        |> render_submit()
        |> follow_redirect(conn, Routes.search_result_show_path(conn, :show, search_result))

      assert html =~ "Search result updated successfully"
      assert html =~ "some updated search_array"
    end
  end
end
