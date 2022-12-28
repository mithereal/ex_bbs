defmodule ApiWeb.BanlistLiveTest do
  use ApiWeb.ConnCase

  import Phoenix.LiveViewTest
  import Api.DatabaseFixtures

  @create_attrs %{group_description: "some group_description", group_id: 42, group_moderator: 42, group_name: "some group_name", group_single_user: 42, group_type: 42}
  @update_attrs %{group_description: "some updated group_description", group_id: 43, group_moderator: 43, group_name: "some updated group_name", group_single_user: 43, group_type: 43}
  @invalid_attrs %{group_description: nil, group_id: nil, group_moderator: nil, group_name: nil, group_single_user: nil, group_type: nil}

  defp create_banlist(_) do
    banlist = banlist_fixture()
    %{banlist: banlist}
  end

  describe "Index" do
    setup [:create_banlist]

    test "lists all banlist", %{conn: conn, banlist: banlist} do
      {:ok, _index_live, html} = live(conn, Routes.banlist_index_path(conn, :index))

      assert html =~ "Listing Banlist"
      assert html =~ banlist.group_description
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
      assert html =~ "some group_description"
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
      assert html =~ "some updated group_description"
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
      assert html =~ banlist.group_description
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
      assert html =~ "some updated group_description"
    end
  end
end
