defmodule ApiWeb.GroupsLiveTest do
  use ApiWeb.ConnCase

  import Phoenix.LiveViewTest
  import Api.DatabaseFixtures

  @create_attrs %{group_description: "some group_description", group_id: 42, group_moderator: 42, group_name: "some group_name", group_single_user: 42, group_type: 42}
  @update_attrs %{group_description: "some updated group_description", group_id: 43, group_moderator: 43, group_name: "some updated group_name", group_single_user: 43, group_type: 43}
  @invalid_attrs %{group_description: nil, group_id: nil, group_moderator: nil, group_name: nil, group_single_user: nil, group_type: nil}

  defp create_groups(_) do
    groups = groups_fixture()
    %{groups: groups}
  end

  describe "Index" do
    setup [:create_groups]

    test "lists all group", %{conn: conn, groups: groups} do
      {:ok, _index_live, html} = live(conn, Routes.groups_index_path(conn, :index))

      assert html =~ "Listing Group"
      assert html =~ groups.group_description
    end

    test "saves new groups", %{conn: conn} do
      {:ok, index_live, _html} = live(conn, Routes.groups_index_path(conn, :index))

      assert index_live |> element("a", "New Groups") |> render_click() =~
               "New Groups"

      assert_patch(index_live, Routes.groups_index_path(conn, :new))

      assert index_live
             |> form("#groups-form", groups: @invalid_attrs)
             |> render_change() =~ "can&#39;t be blank"

      {:ok, _, html} =
        index_live
        |> form("#groups-form", groups: @create_attrs)
        |> render_submit()
        |> follow_redirect(conn, Routes.groups_index_path(conn, :index))

      assert html =~ "Groups created successfully"
      assert html =~ "some group_description"
    end

    test "updates groups in listing", %{conn: conn, groups: groups} do
      {:ok, index_live, _html} = live(conn, Routes.groups_index_path(conn, :index))

      assert index_live |> element("#groups-#{groups.id} a", "Edit") |> render_click() =~
               "Edit Groups"

      assert_patch(index_live, Routes.groups_index_path(conn, :edit, groups))

      assert index_live
             |> form("#groups-form", groups: @invalid_attrs)
             |> render_change() =~ "can&#39;t be blank"

      {:ok, _, html} =
        index_live
        |> form("#groups-form", groups: @update_attrs)
        |> render_submit()
        |> follow_redirect(conn, Routes.groups_index_path(conn, :index))

      assert html =~ "Groups updated successfully"
      assert html =~ "some updated group_description"
    end

    test "deletes groups in listing", %{conn: conn, groups: groups} do
      {:ok, index_live, _html} = live(conn, Routes.groups_index_path(conn, :index))

      assert index_live |> element("#groups-#{groups.id} a", "Delete") |> render_click()
      refute has_element?(index_live, "#groups-#{groups.id}")
    end
  end

  describe "Show" do
    setup [:create_groups]

    test "displays groups", %{conn: conn, groups: groups} do
      {:ok, _show_live, html} = live(conn, Routes.groups_show_path(conn, :show, groups))

      assert html =~ "Show Groups"
      assert html =~ groups.group_description
    end

    test "updates groups within modal", %{conn: conn, groups: groups} do
      {:ok, show_live, _html} = live(conn, Routes.groups_show_path(conn, :show, groups))

      assert show_live |> element("a", "Edit") |> render_click() =~
               "Edit Groups"

      assert_patch(show_live, Routes.groups_show_path(conn, :edit, groups))

      assert show_live
             |> form("#groups-form", groups: @invalid_attrs)
             |> render_change() =~ "can&#39;t be blank"

      {:ok, _, html} =
        show_live
        |> form("#groups-form", groups: @update_attrs)
        |> render_submit()
        |> follow_redirect(conn, Routes.groups_show_path(conn, :show, groups))

      assert html =~ "Groups updated successfully"
      assert html =~ "some updated group_description"
    end
  end
end
