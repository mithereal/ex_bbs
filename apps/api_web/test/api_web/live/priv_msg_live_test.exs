defmodule ApiWeb.PrivMsgLiveTest do
  use ApiWeb.ConnCase

  import Phoenix.LiveViewTest
  import Api.Bbs.SchemaFixtures

  @create_attrs %{privmsgs_attach_sig: 42, privmsgs_date: 42, privmsgs_enable_bbcode: 42, privmsgs_enable_html: 42, privmsgs_enable_smilies: 42, privmsgs_from_userid: 42, privmsgs_id: 42, privmsgs_ip: "some privmsgs_ip", privmsgs_subject: "some privmsgs_subject", privmsgs_to_userid: 42, privmsgs_type: 42}
  @update_attrs %{privmsgs_attach_sig: 43, privmsgs_date: 43, privmsgs_enable_bbcode: 43, privmsgs_enable_html: 43, privmsgs_enable_smilies: 43, privmsgs_from_userid: 43, privmsgs_id: 43, privmsgs_ip: "some updated privmsgs_ip", privmsgs_subject: "some updated privmsgs_subject", privmsgs_to_userid: 43, privmsgs_type: 43}
  @invalid_attrs %{privmsgs_attach_sig: nil, privmsgs_date: nil, privmsgs_enable_bbcode: nil, privmsgs_enable_html: nil, privmsgs_enable_smilies: nil, privmsgs_from_userid: nil, privmsgs_id: nil, privmsgs_ip: nil, privmsgs_subject: nil, privmsgs_to_userid: nil, privmsgs_type: nil}

  defp create_priv_msg(_) do
    priv_msg = priv_msg_fixture()
    %{priv_msg: priv_msg}
  end

  describe "Index" do
    setup [:create_priv_msg]

    test "lists all privmsgs", %{conn: conn, priv_msg: priv_msg} do
      {:ok, _index_live, html} = live(conn, Routes.priv_msg_index_path(conn, :index))

      assert html =~ "Listing Privmsgs"
      assert html =~ priv_msg.privmsgs_ip
    end

    test "saves new priv_msg", %{conn: conn} do
      {:ok, index_live, _html} = live(conn, Routes.priv_msg_index_path(conn, :index))

      assert index_live |> element("a", "New Priv msg") |> render_click() =~
               "New Priv msg"

      assert_patch(index_live, Routes.priv_msg_index_path(conn, :new))

      assert index_live
             |> form("#priv_msg-form", priv_msg: @invalid_attrs)
             |> render_change() =~ "can&#39;t be blank"

      {:ok, _, html} =
        index_live
        |> form("#priv_msg-form", priv_msg: @create_attrs)
        |> render_submit()
        |> follow_redirect(conn, Routes.priv_msg_index_path(conn, :index))

      assert html =~ "Priv msg created successfully"
      assert html =~ "some privmsgs_ip"
    end

    test "updates priv_msg in listing", %{conn: conn, priv_msg: priv_msg} do
      {:ok, index_live, _html} = live(conn, Routes.priv_msg_index_path(conn, :index))

      assert index_live |> element("#priv_msg-#{priv_msg.id} a", "Edit") |> render_click() =~
               "Edit Priv msg"

      assert_patch(index_live, Routes.priv_msg_index_path(conn, :edit, priv_msg))

      assert index_live
             |> form("#priv_msg-form", priv_msg: @invalid_attrs)
             |> render_change() =~ "can&#39;t be blank"

      {:ok, _, html} =
        index_live
        |> form("#priv_msg-form", priv_msg: @update_attrs)
        |> render_submit()
        |> follow_redirect(conn, Routes.priv_msg_index_path(conn, :index))

      assert html =~ "Priv msg updated successfully"
      assert html =~ "some updated privmsgs_ip"
    end

    test "deletes priv_msg in listing", %{conn: conn, priv_msg: priv_msg} do
      {:ok, index_live, _html} = live(conn, Routes.priv_msg_index_path(conn, :index))

      assert index_live |> element("#priv_msg-#{priv_msg.id} a", "Delete") |> render_click()
      refute has_element?(index_live, "#priv_msg-#{priv_msg.id}")
    end
  end

  describe "Show" do
    setup [:create_priv_msg]

    test "displays priv_msg", %{conn: conn, priv_msg: priv_msg} do
      {:ok, _show_live, html} = live(conn, Routes.priv_msg_show_path(conn, :show, priv_msg))

      assert html =~ "Show Priv msg"
      assert html =~ priv_msg.privmsgs_ip
    end

    test "updates priv_msg within modal", %{conn: conn, priv_msg: priv_msg} do
      {:ok, show_live, _html} = live(conn, Routes.priv_msg_show_path(conn, :show, priv_msg))

      assert show_live |> element("a", "Edit") |> render_click() =~
               "Edit Priv msg"

      assert_patch(show_live, Routes.priv_msg_show_path(conn, :edit, priv_msg))

      assert show_live
             |> form("#priv_msg-form", priv_msg: @invalid_attrs)
             |> render_change() =~ "can&#39;t be blank"

      {:ok, _, html} =
        show_live
        |> form("#priv_msg-form", priv_msg: @update_attrs)
        |> render_submit()
        |> follow_redirect(conn, Routes.priv_msg_show_path(conn, :show, priv_msg))

      assert html =~ "Priv msg updated successfully"
      assert html =~ "some updated privmsgs_ip"
    end
  end
end
