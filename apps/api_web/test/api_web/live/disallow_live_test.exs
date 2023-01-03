defmodule ApiWeb.DisallowLiveTest do
  use ApiWeb.ConnCase

  import Phoenix.LiveViewTest
  import Api.Bbs.SchemaFixtures

  @create_attrs %{disallow_id: 42, disallow_username: "some disallow_username"}
  @update_attrs %{disallow_id: 43, disallow_username: "some updated disallow_username"}
  @invalid_attrs %{disallow_id: nil, disallow_username: nil}

  defp create_disallow(_) do
    disallow = disallow_fixture()
    %{disallow: disallow}
  end

  describe "Index" do
    setup [:create_disallow]

    test "lists all disallow", %{conn: conn, disallow: disallow} do
      {:ok, _index_live, html} = live(conn, Routes.disallow_index_path(conn, :index))

      assert html =~ "Listing Disallow"
      assert html =~ disallow.disallow_username
    end

    test "saves new disallow", %{conn: conn} do
      {:ok, index_live, _html} = live(conn, Routes.disallow_index_path(conn, :index))

      assert index_live |> element("a", "New Disallow") |> render_click() =~
               "New Disallow"

      assert_patch(index_live, Routes.disallow_index_path(conn, :new))

      assert index_live
             |> form("#disallow-form", disallow: @invalid_attrs)
             |> render_change() =~ "can&#39;t be blank"

      {:ok, _, html} =
        index_live
        |> form("#disallow-form", disallow: @create_attrs)
        |> render_submit()
        |> follow_redirect(conn, Routes.disallow_index_path(conn, :index))

      assert html =~ "Disallow created successfully"
      assert html =~ "some disallow_username"
    end

    test "updates disallow in listing", %{conn: conn, disallow: disallow} do
      {:ok, index_live, _html} = live(conn, Routes.disallow_index_path(conn, :index))

      assert index_live |> element("#disallow-#{disallow.id} a", "Edit") |> render_click() =~
               "Edit Disallow"

      assert_patch(index_live, Routes.disallow_index_path(conn, :edit, disallow))

      assert index_live
             |> form("#disallow-form", disallow: @invalid_attrs)
             |> render_change() =~ "can&#39;t be blank"

      {:ok, _, html} =
        index_live
        |> form("#disallow-form", disallow: @update_attrs)
        |> render_submit()
        |> follow_redirect(conn, Routes.disallow_index_path(conn, :index))

      assert html =~ "Disallow updated successfully"
      assert html =~ "some updated disallow_username"
    end

    test "deletes disallow in listing", %{conn: conn, disallow: disallow} do
      {:ok, index_live, _html} = live(conn, Routes.disallow_index_path(conn, :index))

      assert index_live |> element("#disallow-#{disallow.id} a", "Delete") |> render_click()
      refute has_element?(index_live, "#disallow-#{disallow.id}")
    end
  end

  describe "Show" do
    setup [:create_disallow]

    test "displays disallow", %{conn: conn, disallow: disallow} do
      {:ok, _show_live, html} = live(conn, Routes.disallow_show_path(conn, :show, disallow))

      assert html =~ "Show Disallow"
      assert html =~ disallow.disallow_username
    end

    test "updates disallow within modal", %{conn: conn, disallow: disallow} do
      {:ok, show_live, _html} = live(conn, Routes.disallow_show_path(conn, :show, disallow))

      assert show_live |> element("a", "Edit") |> render_click() =~
               "Edit Disallow"

      assert_patch(show_live, Routes.disallow_show_path(conn, :edit, disallow))

      assert show_live
             |> form("#disallow-form", disallow: @invalid_attrs)
             |> render_change() =~ "can&#39;t be blank"

      {:ok, _, html} =
        show_live
        |> form("#disallow-form", disallow: @update_attrs)
        |> render_submit()
        |> follow_redirect(conn, Routes.disallow_show_path(conn, :show, disallow))

      assert html =~ "Disallow updated successfully"
      assert html =~ "some updated disallow_username"
    end
  end
end
