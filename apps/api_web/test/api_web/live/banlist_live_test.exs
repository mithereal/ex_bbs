defmodule ApiWeb.BanlistLiveTest do
  use ApiWeb.ConnCase

  import Phoenix.LiveViewTest
  import Api.BbsFixtures

  @create_attrs %{ban_email: "some ban_email", ban_id: 42, ban_ip: "some ban_ip", ban_userid: 42}
  @update_attrs %{ban_email: "some updated ban_email", ban_id: 43, ban_ip: "some updated ban_ip", ban_userid: 43}
  @invalid_attrs %{ban_email: nil, ban_id: nil, ban_ip: nil, ban_userid: nil}

  defp create_banlist(_) do
    banlist = banlist_fixture()
    %{banlist: banlist}
  end

  describe "Index" do
    setup [:create_banlist]

    test "lists all banlist", %{conn: conn, banlist: banlist} do
      {:ok, _index_live, html} = live(conn, Routes.banlist_index_path(conn, :index))

      assert html =~ "Listing Banlist"
      assert html =~ banlist.ban_email
    end

    test "saves new banlist", %{conn: conn} do
      {:ok, index_live, _html} = live(conn, Routes.banlist_index_path(conn, :index))

      assert index_live |> element("a", "New Banlist") |> render_click() =~
               "New Banlist"

      assert_patch(index_live, Routes.banlist_index_path(conn, :new))

      assert index_live
             |> form("#banlist-form", banlist: @invalid_attrs)
             |> render_change() =~ "can&#39;t be blank"

      {:ok, _, html} =
        index_live
        |> form("#banlist-form", banlist: @create_attrs)
        |> render_submit()
        |> follow_redirect(conn, Routes.banlist_index_path(conn, :index))

      assert html =~ "Banlist created successfully"
      assert html =~ "some ban_email"
    end

    test "updates banlist in listing", %{conn: conn, banlist: banlist} do
      {:ok, index_live, _html} = live(conn, Routes.banlist_index_path(conn, :index))

      assert index_live |> element("#banlist-#{banlist.id} a", "Edit") |> render_click() =~
               "Edit Banlist"

      assert_patch(index_live, Routes.banlist_index_path(conn, :edit, banlist))

      assert index_live
             |> form("#banlist-form", banlist: @invalid_attrs)
             |> render_change() =~ "can&#39;t be blank"

      {:ok, _, html} =
        index_live
        |> form("#banlist-form", banlist: @update_attrs)
        |> render_submit()
        |> follow_redirect(conn, Routes.banlist_index_path(conn, :index))

      assert html =~ "Banlist updated successfully"
      assert html =~ "some updated ban_email"
    end

    test "deletes banlist in listing", %{conn: conn, banlist: banlist} do
      {:ok, index_live, _html} = live(conn, Routes.banlist_index_path(conn, :index))

      assert index_live |> element("#banlist-#{banlist.id} a", "Delete") |> render_click()
      refute has_element?(index_live, "#banlist-#{banlist.id}")
    end
  end

  describe "Show" do
    setup [:create_banlist]

    test "displays banlist", %{conn: conn, banlist: banlist} do
      {:ok, _show_live, html} = live(conn, Routes.banlist_show_path(conn, :show, banlist))

      assert html =~ "Show Banlist"
      assert html =~ banlist.ban_email
    end

    test "updates banlist within modal", %{conn: conn, banlist: banlist} do
      {:ok, show_live, _html} = live(conn, Routes.banlist_show_path(conn, :show, banlist))

      assert show_live |> element("a", "Edit") |> render_click() =~
               "Edit Banlist"

      assert_patch(show_live, Routes.banlist_show_path(conn, :edit, banlist))

      assert show_live
             |> form("#banlist-form", banlist: @invalid_attrs)
             |> render_change() =~ "can&#39;t be blank"

      {:ok, _, html} =
        show_live
        |> form("#banlist-form", banlist: @update_attrs)
        |> render_submit()
        |> follow_redirect(conn, Routes.banlist_show_path(conn, :show, banlist))

      assert html =~ "Banlist updated successfully"
      assert html =~ "some updated ban_email"
    end
  end
end
