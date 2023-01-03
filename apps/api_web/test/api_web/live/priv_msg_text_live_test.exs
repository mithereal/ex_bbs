defmodule ApiWeb.PrivMsgTextLiveTest do
  use ApiWeb.ConnCase

  import Phoenix.LiveViewTest
  import Api.Bbs.SchemaFixtures

  @create_attrs %{privmsgs_bbcode_uid: "some privmsgs_bbcode_uid", privmsgs_text: "some privmsgs_text", privmsgs_text_id: 42}
  @update_attrs %{privmsgs_bbcode_uid: "some updated privmsgs_bbcode_uid", privmsgs_text: "some updated privmsgs_text", privmsgs_text_id: 43}
  @invalid_attrs %{privmsgs_bbcode_uid: nil, privmsgs_text: nil, privmsgs_text_id: nil}

  defp create_priv_msg_text(_) do
    priv_msg_text = priv_msg_text_fixture()
    %{priv_msg_text: priv_msg_text}
  end

  describe "Index" do
    setup [:create_priv_msg_text]

    test "lists all privmsgs_text", %{conn: conn, priv_msg_text: priv_msg_text} do
      {:ok, _index_live, html} = live(conn, Routes.priv_msg_text_index_path(conn, :index))

      assert html =~ "Listing Privmsgs text"
      assert html =~ priv_msg_text.privmsgs_bbcode_uid
    end

    test "saves new priv_msg_text", %{conn: conn} do
      {:ok, index_live, _html} = live(conn, Routes.priv_msg_text_index_path(conn, :index))

      assert index_live |> element("a", "New Priv msg text") |> render_click() =~
               "New Priv msg text"

      assert_patch(index_live, Routes.priv_msg_text_index_path(conn, :new))

      assert index_live
             |> form("#priv_msg_text-form", priv_msg_text: @invalid_attrs)
             |> render_change() =~ "can&#39;t be blank"

      {:ok, _, html} =
        index_live
        |> form("#priv_msg_text-form", priv_msg_text: @create_attrs)
        |> render_submit()
        |> follow_redirect(conn, Routes.priv_msg_text_index_path(conn, :index))

      assert html =~ "Priv msg text created successfully"
      assert html =~ "some privmsgs_bbcode_uid"
    end

    test "updates priv_msg_text in listing", %{conn: conn, priv_msg_text: priv_msg_text} do
      {:ok, index_live, _html} = live(conn, Routes.priv_msg_text_index_path(conn, :index))

      assert index_live |> element("#priv_msg_text-#{priv_msg_text.id} a", "Edit") |> render_click() =~
               "Edit Priv msg text"

      assert_patch(index_live, Routes.priv_msg_text_index_path(conn, :edit, priv_msg_text))

      assert index_live
             |> form("#priv_msg_text-form", priv_msg_text: @invalid_attrs)
             |> render_change() =~ "can&#39;t be blank"

      {:ok, _, html} =
        index_live
        |> form("#priv_msg_text-form", priv_msg_text: @update_attrs)
        |> render_submit()
        |> follow_redirect(conn, Routes.priv_msg_text_index_path(conn, :index))

      assert html =~ "Priv msg text updated successfully"
      assert html =~ "some updated privmsgs_bbcode_uid"
    end

    test "deletes priv_msg_text in listing", %{conn: conn, priv_msg_text: priv_msg_text} do
      {:ok, index_live, _html} = live(conn, Routes.priv_msg_text_index_path(conn, :index))

      assert index_live |> element("#priv_msg_text-#{priv_msg_text.id} a", "Delete") |> render_click()
      refute has_element?(index_live, "#priv_msg_text-#{priv_msg_text.id}")
    end
  end

  describe "Show" do
    setup [:create_priv_msg_text]

    test "displays priv_msg_text", %{conn: conn, priv_msg_text: priv_msg_text} do
      {:ok, _show_live, html} = live(conn, Routes.priv_msg_text_show_path(conn, :show, priv_msg_text))

      assert html =~ "Show Priv msg text"
      assert html =~ priv_msg_text.privmsgs_bbcode_uid
    end

    test "updates priv_msg_text within modal", %{conn: conn, priv_msg_text: priv_msg_text} do
      {:ok, show_live, _html} = live(conn, Routes.priv_msg_text_show_path(conn, :show, priv_msg_text))

      assert show_live |> element("a", "Edit") |> render_click() =~
               "Edit Priv msg text"

      assert_patch(show_live, Routes.priv_msg_text_show_path(conn, :edit, priv_msg_text))

      assert show_live
             |> form("#priv_msg_text-form", priv_msg_text: @invalid_attrs)
             |> render_change() =~ "can&#39;t be blank"

      {:ok, _, html} =
        show_live
        |> form("#priv_msg_text-form", priv_msg_text: @update_attrs)
        |> render_submit()
        |> follow_redirect(conn, Routes.priv_msg_text_show_path(conn, :show, priv_msg_text))

      assert html =~ "Priv msg text updated successfully"
      assert html =~ "some updated privmsgs_bbcode_uid"
    end
  end
end
