defmodule ApiWeb.PostTextLiveTest do
  use ApiWeb.ConnCase

  import Phoenix.LiveViewTest
  import Api.DatabaseFixtures

  @create_attrs %{bbcode_uid: "some bbcode_uid", post_id: 42, post_subject: "some post_subject", post_text: "some post_text"}
  @update_attrs %{bbcode_uid: "some updated bbcode_uid", post_id: 43, post_subject: "some updated post_subject", post_text: "some updated post_text"}
  @invalid_attrs %{bbcode_uid: nil, post_id: nil, post_subject: nil, post_text: nil}

  defp create_post_text(_) do
    post_text = post_text_fixture()
    %{post_text: post_text}
  end

  describe "Index" do
    setup [:create_post_text]

    test "lists all posts_text", %{conn: conn, post_text: post_text} do
      {:ok, _index_live, html} = live(conn, Routes.post_text_index_path(conn, :index))

      assert html =~ "Listing Posts text"
      assert html =~ post_text.bbcode_uid
    end

    test "saves new post_text", %{conn: conn} do
      {:ok, index_live, _html} = live(conn, Routes.post_text_index_path(conn, :index))

      assert index_live |> element("a", "New Post text") |> render_click() =~
               "New Post text"

      assert_patch(index_live, Routes.post_text_index_path(conn, :new))

      assert index_live
             |> form("#post_text-form", post_text: @invalid_attrs)
             |> render_change() =~ "can&#39;t be blank"

      {:ok, _, html} =
        index_live
        |> form("#post_text-form", post_text: @create_attrs)
        |> render_submit()
        |> follow_redirect(conn, Routes.post_text_index_path(conn, :index))

      assert html =~ "Post text created successfully"
      assert html =~ "some bbcode_uid"
    end

    test "updates post_text in listing", %{conn: conn, post_text: post_text} do
      {:ok, index_live, _html} = live(conn, Routes.post_text_index_path(conn, :index))

      assert index_live |> element("#post_text-#{post_text.id} a", "Edit") |> render_click() =~
               "Edit Post text"

      assert_patch(index_live, Routes.post_text_index_path(conn, :edit, post_text))

      assert index_live
             |> form("#post_text-form", post_text: @invalid_attrs)
             |> render_change() =~ "can&#39;t be blank"

      {:ok, _, html} =
        index_live
        |> form("#post_text-form", post_text: @update_attrs)
        |> render_submit()
        |> follow_redirect(conn, Routes.post_text_index_path(conn, :index))

      assert html =~ "Post text updated successfully"
      assert html =~ "some updated bbcode_uid"
    end

    test "deletes post_text in listing", %{conn: conn, post_text: post_text} do
      {:ok, index_live, _html} = live(conn, Routes.post_text_index_path(conn, :index))

      assert index_live |> element("#post_text-#{post_text.id} a", "Delete") |> render_click()
      refute has_element?(index_live, "#post_text-#{post_text.id}")
    end
  end

  describe "Show" do
    setup [:create_post_text]

    test "displays post_text", %{conn: conn, post_text: post_text} do
      {:ok, _show_live, html} = live(conn, Routes.post_text_show_path(conn, :show, post_text))

      assert html =~ "Show Post text"
      assert html =~ post_text.bbcode_uid
    end

    test "updates post_text within modal", %{conn: conn, post_text: post_text} do
      {:ok, show_live, _html} = live(conn, Routes.post_text_show_path(conn, :show, post_text))

      assert show_live |> element("a", "Edit") |> render_click() =~
               "Edit Post text"

      assert_patch(show_live, Routes.post_text_show_path(conn, :edit, post_text))

      assert show_live
             |> form("#post_text-form", post_text: @invalid_attrs)
             |> render_change() =~ "can&#39;t be blank"

      {:ok, _, html} =
        show_live
        |> form("#post_text-form", post_text: @update_attrs)
        |> render_submit()
        |> follow_redirect(conn, Routes.post_text_show_path(conn, :show, post_text))

      assert html =~ "Post text updated successfully"
      assert html =~ "some updated bbcode_uid"
    end
  end
end
