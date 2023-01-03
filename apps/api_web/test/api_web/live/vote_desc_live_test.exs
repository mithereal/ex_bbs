defmodule ApiWeb.VoteDescLiveTest do
  use ApiWeb.ConnCase

  import Phoenix.LiveViewTest
  import Api.Bbs.SchemaFixtures

  @create_attrs %{topic_id: 42, vote_id: 42, vote_length: 42, vote_start: 42, vote_text: 42}
  @update_attrs %{topic_id: 43, vote_id: 43, vote_length: 43, vote_start: 43, vote_text: 43}
  @invalid_attrs %{topic_id: nil, vote_id: nil, vote_length: nil, vote_start: nil, vote_text: nil}

  defp create_vote_desc(_) do
    vote_desc = vote_desc_fixture()
    %{vote_desc: vote_desc}
  end

  describe "Index" do
    setup [:create_vote_desc]

    test "lists all vote_desc", %{conn: conn} do
      {:ok, _index_live, html} = live(conn, Routes.vote_desc_index_path(conn, :index))

      assert html =~ "Listing Vote desc"
    end

    test "saves new vote_desc", %{conn: conn} do
      {:ok, index_live, _html} = live(conn, Routes.vote_desc_index_path(conn, :index))

      assert index_live |> element("a", "New Vote desc") |> render_click() =~
               "New Vote desc"

      assert_patch(index_live, Routes.vote_desc_index_path(conn, :new))

      assert index_live
             |> form("#vote_desc-form", vote_desc: @invalid_attrs)
             |> render_change() =~ "can&#39;t be blank"

      {:ok, _, html} =
        index_live
        |> form("#vote_desc-form", vote_desc: @create_attrs)
        |> render_submit()
        |> follow_redirect(conn, Routes.vote_desc_index_path(conn, :index))

      assert html =~ "Vote desc created successfully"
    end

    test "updates vote_desc in listing", %{conn: conn, vote_desc: vote_desc} do
      {:ok, index_live, _html} = live(conn, Routes.vote_desc_index_path(conn, :index))

      assert index_live |> element("#vote_desc-#{vote_desc.id} a", "Edit") |> render_click() =~
               "Edit Vote desc"

      assert_patch(index_live, Routes.vote_desc_index_path(conn, :edit, vote_desc))

      assert index_live
             |> form("#vote_desc-form", vote_desc: @invalid_attrs)
             |> render_change() =~ "can&#39;t be blank"

      {:ok, _, html} =
        index_live
        |> form("#vote_desc-form", vote_desc: @update_attrs)
        |> render_submit()
        |> follow_redirect(conn, Routes.vote_desc_index_path(conn, :index))

      assert html =~ "Vote desc updated successfully"
    end

    test "deletes vote_desc in listing", %{conn: conn, vote_desc: vote_desc} do
      {:ok, index_live, _html} = live(conn, Routes.vote_desc_index_path(conn, :index))

      assert index_live |> element("#vote_desc-#{vote_desc.id} a", "Delete") |> render_click()
      refute has_element?(index_live, "#vote_desc-#{vote_desc.id}")
    end
  end

  describe "Show" do
    setup [:create_vote_desc]

    test "displays vote_desc", %{conn: conn, vote_desc: vote_desc} do
      {:ok, _show_live, html} = live(conn, Routes.vote_desc_show_path(conn, :show, vote_desc))

      assert html =~ "Show Vote desc"
    end

    test "updates vote_desc within modal", %{conn: conn, vote_desc: vote_desc} do
      {:ok, show_live, _html} = live(conn, Routes.vote_desc_show_path(conn, :show, vote_desc))

      assert show_live |> element("a", "Edit") |> render_click() =~
               "Edit Vote desc"

      assert_patch(show_live, Routes.vote_desc_show_path(conn, :edit, vote_desc))

      assert show_live
             |> form("#vote_desc-form", vote_desc: @invalid_attrs)
             |> render_change() =~ "can&#39;t be blank"

      {:ok, _, html} =
        show_live
        |> form("#vote_desc-form", vote_desc: @update_attrs)
        |> render_submit()
        |> follow_redirect(conn, Routes.vote_desc_show_path(conn, :show, vote_desc))

      assert html =~ "Vote desc updated successfully"
    end
  end
end
