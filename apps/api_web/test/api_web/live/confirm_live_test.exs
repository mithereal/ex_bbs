defmodule ApiWeb.ConfirmLiveTest do
  use ApiWeb.ConnCase

  import Phoenix.LiveViewTest
  import Api.Bbs.SchemaFixtures

  @create_attrs %{code: 42, confirm_id: 42, session_id: 42}
  @update_attrs %{code: 43, confirm_id: 43, session_id: 43}
  @invalid_attrs %{code: nil, confirm_id: nil, session_id: nil}

  defp create_confirm(_) do
    confirm = confirm_fixture()
    %{confirm: confirm}
  end

  describe "Index" do
    setup [:create_confirm]

    test "lists all confirm", %{conn: conn} do
      {:ok, _index_live, html} = live(conn, Routes.confirm_index_path(conn, :index))

      assert html =~ "Listing Confirm"
    end

    test "saves new confirm", %{conn: conn} do
      {:ok, index_live, _html} = live(conn, Routes.confirm_index_path(conn, :index))

      assert index_live |> element("a", "New Confirm") |> render_click() =~
               "New Confirm"

      assert_patch(index_live, Routes.confirm_index_path(conn, :new))

      assert index_live
             |> form("#confirm-form", confirm: @invalid_attrs)
             |> render_change() =~ "can&#39;t be blank"

      {:ok, _, html} =
        index_live
        |> form("#confirm-form", confirm: @create_attrs)
        |> render_submit()
        |> follow_redirect(conn, Routes.confirm_index_path(conn, :index))

      assert html =~ "Confirm created successfully"
    end

    test "updates confirm in listing", %{conn: conn, confirm: confirm} do
      {:ok, index_live, _html} = live(conn, Routes.confirm_index_path(conn, :index))

      assert index_live |> element("#confirm-#{confirm.id} a", "Edit") |> render_click() =~
               "Edit Confirm"

      assert_patch(index_live, Routes.confirm_index_path(conn, :edit, confirm))

      assert index_live
             |> form("#confirm-form", confirm: @invalid_attrs)
             |> render_change() =~ "can&#39;t be blank"

      {:ok, _, html} =
        index_live
        |> form("#confirm-form", confirm: @update_attrs)
        |> render_submit()
        |> follow_redirect(conn, Routes.confirm_index_path(conn, :index))

      assert html =~ "Confirm updated successfully"
    end

    test "deletes confirm in listing", %{conn: conn, confirm: confirm} do
      {:ok, index_live, _html} = live(conn, Routes.confirm_index_path(conn, :index))

      assert index_live |> element("#confirm-#{confirm.id} a", "Delete") |> render_click()
      refute has_element?(index_live, "#confirm-#{confirm.id}")
    end
  end

  describe "Show" do
    setup [:create_confirm]

    test "displays confirm", %{conn: conn, confirm: confirm} do
      {:ok, _show_live, html} = live(conn, Routes.confirm_show_path(conn, :show, confirm))

      assert html =~ "Show Confirm"
    end

    test "updates confirm within modal", %{conn: conn, confirm: confirm} do
      {:ok, show_live, _html} = live(conn, Routes.confirm_show_path(conn, :show, confirm))

      assert show_live |> element("a", "Edit") |> render_click() =~
               "Edit Confirm"

      assert_patch(show_live, Routes.confirm_show_path(conn, :edit, confirm))

      assert show_live
             |> form("#confirm-form", confirm: @invalid_attrs)
             |> render_change() =~ "can&#39;t be blank"

      {:ok, _, html} =
        show_live
        |> form("#confirm-form", confirm: @update_attrs)
        |> render_submit()
        |> follow_redirect(conn, Routes.confirm_show_path(conn, :show, confirm))

      assert html =~ "Confirm updated successfully"
    end
  end
end
