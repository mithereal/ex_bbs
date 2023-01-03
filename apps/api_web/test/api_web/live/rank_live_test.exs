defmodule ApiWeb.RankLiveTest do
  use ApiWeb.ConnCase

  import Phoenix.LiveViewTest
  import Api.Bbs.SchemaFixtures

  @create_attrs %{rank_id: 42, rank_image: "some rank_image", rank_min: 42, rank_special: 42, rank_title: "some rank_title"}
  @update_attrs %{rank_id: 43, rank_image: "some updated rank_image", rank_min: 43, rank_special: 43, rank_title: "some updated rank_title"}
  @invalid_attrs %{rank_id: nil, rank_image: nil, rank_min: nil, rank_special: nil, rank_title: nil}

  defp create_rank(_) do
    rank = rank_fixture()
    %{rank: rank}
  end

  describe "Index" do
    setup [:create_rank]

    test "lists all ranks", %{conn: conn, rank: rank} do
      {:ok, _index_live, html} = live(conn, Routes.rank_index_path(conn, :index))

      assert html =~ "Listing Ranks"
      assert html =~ rank.rank_image
    end

    test "saves new rank", %{conn: conn} do
      {:ok, index_live, _html} = live(conn, Routes.rank_index_path(conn, :index))

      assert index_live |> element("a", "New Rank") |> render_click() =~
               "New Rank"

      assert_patch(index_live, Routes.rank_index_path(conn, :new))

      assert index_live
             |> form("#rank-form", rank: @invalid_attrs)
             |> render_change() =~ "can&#39;t be blank"

      {:ok, _, html} =
        index_live
        |> form("#rank-form", rank: @create_attrs)
        |> render_submit()
        |> follow_redirect(conn, Routes.rank_index_path(conn, :index))

      assert html =~ "Rank created successfully"
      assert html =~ "some rank_image"
    end

    test "updates rank in listing", %{conn: conn, rank: rank} do
      {:ok, index_live, _html} = live(conn, Routes.rank_index_path(conn, :index))

      assert index_live |> element("#rank-#{rank.id} a", "Edit") |> render_click() =~
               "Edit Rank"

      assert_patch(index_live, Routes.rank_index_path(conn, :edit, rank))

      assert index_live
             |> form("#rank-form", rank: @invalid_attrs)
             |> render_change() =~ "can&#39;t be blank"

      {:ok, _, html} =
        index_live
        |> form("#rank-form", rank: @update_attrs)
        |> render_submit()
        |> follow_redirect(conn, Routes.rank_index_path(conn, :index))

      assert html =~ "Rank updated successfully"
      assert html =~ "some updated rank_image"
    end

    test "deletes rank in listing", %{conn: conn, rank: rank} do
      {:ok, index_live, _html} = live(conn, Routes.rank_index_path(conn, :index))

      assert index_live |> element("#rank-#{rank.id} a", "Delete") |> render_click()
      refute has_element?(index_live, "#rank-#{rank.id}")
    end
  end

  describe "Show" do
    setup [:create_rank]

    test "displays rank", %{conn: conn, rank: rank} do
      {:ok, _show_live, html} = live(conn, Routes.rank_show_path(conn, :show, rank))

      assert html =~ "Show Rank"
      assert html =~ rank.rank_image
    end

    test "updates rank within modal", %{conn: conn, rank: rank} do
      {:ok, show_live, _html} = live(conn, Routes.rank_show_path(conn, :show, rank))

      assert show_live |> element("a", "Edit") |> render_click() =~
               "Edit Rank"

      assert_patch(show_live, Routes.rank_show_path(conn, :edit, rank))

      assert show_live
             |> form("#rank-form", rank: @invalid_attrs)
             |> render_change() =~ "can&#39;t be blank"

      {:ok, _, html} =
        show_live
        |> form("#rank-form", rank: @update_attrs)
        |> render_submit()
        |> follow_redirect(conn, Routes.rank_show_path(conn, :show, rank))

      assert html =~ "Rank updated successfully"
      assert html =~ "some updated rank_image"
    end
  end
end
