defmodule ApiWeb.VoteResultLiveTest do
  use ApiWeb.ConnCase

  import Phoenix.LiveViewTest
  import Api.DatabaseFixtures

  @create_attrs %{vote_id: 42, vote_option_id: 42, vote_option_text: "some vote_option_text", vote_result: 42}
  @update_attrs %{vote_id: 43, vote_option_id: 43, vote_option_text: "some updated vote_option_text", vote_result: 43}
  @invalid_attrs %{vote_id: nil, vote_option_id: nil, vote_option_text: nil, vote_result: nil}

  defp create_vote_result(_) do
    vote_result = vote_result_fixture()
    %{vote_result: vote_result}
  end

  describe "Index" do
    setup [:create_vote_result]

    test "lists all vote_results", %{conn: conn, vote_result: vote_result} do
      {:ok, _index_live, html} = live(conn, Routes.vote_result_index_path(conn, :index))

      assert html =~ "Listing Vote results"
      assert html =~ vote_result.vote_option_text
    end

    test "saves new vote_result", %{conn: conn} do
      {:ok, index_live, _html} = live(conn, Routes.vote_result_index_path(conn, :index))

      assert index_live |> element("a", "New Vote result") |> render_click() =~
               "New Vote result"

      assert_patch(index_live, Routes.vote_result_index_path(conn, :new))

      assert index_live
             |> form("#vote_result-form", vote_result: @invalid_attrs)
             |> render_change() =~ "can&#39;t be blank"

      {:ok, _, html} =
        index_live
        |> form("#vote_result-form", vote_result: @create_attrs)
        |> render_submit()
        |> follow_redirect(conn, Routes.vote_result_index_path(conn, :index))

      assert html =~ "Vote result created successfully"
      assert html =~ "some vote_option_text"
    end

    test "updates vote_result in listing", %{conn: conn, vote_result: vote_result} do
      {:ok, index_live, _html} = live(conn, Routes.vote_result_index_path(conn, :index))

      assert index_live |> element("#vote_result-#{vote_result.id} a", "Edit") |> render_click() =~
               "Edit Vote result"

      assert_patch(index_live, Routes.vote_result_index_path(conn, :edit, vote_result))

      assert index_live
             |> form("#vote_result-form", vote_result: @invalid_attrs)
             |> render_change() =~ "can&#39;t be blank"

      {:ok, _, html} =
        index_live
        |> form("#vote_result-form", vote_result: @update_attrs)
        |> render_submit()
        |> follow_redirect(conn, Routes.vote_result_index_path(conn, :index))

      assert html =~ "Vote result updated successfully"
      assert html =~ "some updated vote_option_text"
    end

    test "deletes vote_result in listing", %{conn: conn, vote_result: vote_result} do
      {:ok, index_live, _html} = live(conn, Routes.vote_result_index_path(conn, :index))

      assert index_live |> element("#vote_result-#{vote_result.id} a", "Delete") |> render_click()
      refute has_element?(index_live, "#vote_result-#{vote_result.id}")
    end
  end

  describe "Show" do
    setup [:create_vote_result]

    test "displays vote_result", %{conn: conn, vote_result: vote_result} do
      {:ok, _show_live, html} = live(conn, Routes.vote_result_show_path(conn, :show, vote_result))

      assert html =~ "Show Vote result"
      assert html =~ vote_result.vote_option_text
    end

    test "updates vote_result within modal", %{conn: conn, vote_result: vote_result} do
      {:ok, show_live, _html} = live(conn, Routes.vote_result_show_path(conn, :show, vote_result))

      assert show_live |> element("a", "Edit") |> render_click() =~
               "Edit Vote result"

      assert_patch(show_live, Routes.vote_result_show_path(conn, :edit, vote_result))

      assert show_live
             |> form("#vote_result-form", vote_result: @invalid_attrs)
             |> render_change() =~ "can&#39;t be blank"

      {:ok, _, html} =
        show_live
        |> form("#vote_result-form", vote_result: @update_attrs)
        |> render_submit()
        |> follow_redirect(conn, Routes.vote_result_show_path(conn, :show, vote_result))

      assert html =~ "Vote result updated successfully"
      assert html =~ "some updated vote_option_text"
    end
  end
end
