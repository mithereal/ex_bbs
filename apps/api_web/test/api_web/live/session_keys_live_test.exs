defmodule ApiWeb.SessionKeysLiveTest do
  use ApiWeb.ConnCase

  import Phoenix.LiveViewTest
  import Api.Bbs.SchemaFixtures

  @create_attrs %{key_id: "some key_id", last_ip: "some last_ip", last_login: 42, user_id: 42}
  @update_attrs %{key_id: "some updated key_id", last_ip: "some updated last_ip", last_login: 43, user_id: 43}
  @invalid_attrs %{key_id: nil, last_ip: nil, last_login: nil, user_id: nil}

  defp create_session_keys(_) do
    session_keys = session_keys_fixture()
    %{session_keys: session_keys}
  end

  describe "Index" do
    setup [:create_session_keys]

    test "lists all sessions_keys", %{conn: conn, session_keys: session_keys} do
      {:ok, _index_live, html} = live(conn, Routes.session_keys_index_path(conn, :index))

      assert html =~ "Listing Sessions keys"
      assert html =~ session_keys.key_id
    end

    test "saves new session_keys", %{conn: conn} do
      {:ok, index_live, _html} = live(conn, Routes.session_keys_index_path(conn, :index))

      assert index_live |> element("a", "New Session keys") |> render_click() =~
               "New Session keys"

      assert_patch(index_live, Routes.session_keys_index_path(conn, :new))

      assert index_live
             |> form("#session_keys-form", session_keys: @invalid_attrs)
             |> render_change() =~ "can&#39;t be blank"

      {:ok, _, html} =
        index_live
        |> form("#session_keys-form", session_keys: @create_attrs)
        |> render_submit()
        |> follow_redirect(conn, Routes.session_keys_index_path(conn, :index))

      assert html =~ "Session keys created successfully"
      assert html =~ "some key_id"
    end

    test "updates session_keys in listing", %{conn: conn, session_keys: session_keys} do
      {:ok, index_live, _html} = live(conn, Routes.session_keys_index_path(conn, :index))

      assert index_live |> element("#session_keys-#{session_keys.id} a", "Edit") |> render_click() =~
               "Edit Session keys"

      assert_patch(index_live, Routes.session_keys_index_path(conn, :edit, session_keys))

      assert index_live
             |> form("#session_keys-form", session_keys: @invalid_attrs)
             |> render_change() =~ "can&#39;t be blank"

      {:ok, _, html} =
        index_live
        |> form("#session_keys-form", session_keys: @update_attrs)
        |> render_submit()
        |> follow_redirect(conn, Routes.session_keys_index_path(conn, :index))

      assert html =~ "Session keys updated successfully"
      assert html =~ "some updated key_id"
    end

    test "deletes session_keys in listing", %{conn: conn, session_keys: session_keys} do
      {:ok, index_live, _html} = live(conn, Routes.session_keys_index_path(conn, :index))

      assert index_live |> element("#session_keys-#{session_keys.id} a", "Delete") |> render_click()
      refute has_element?(index_live, "#session_keys-#{session_keys.id}")
    end
  end

  describe "Show" do
    setup [:create_session_keys]

    test "displays session_keys", %{conn: conn, session_keys: session_keys} do
      {:ok, _show_live, html} = live(conn, Routes.session_keys_show_path(conn, :show, session_keys))

      assert html =~ "Show Session keys"
      assert html =~ session_keys.key_id
    end

    test "updates session_keys within modal", %{conn: conn, session_keys: session_keys} do
      {:ok, show_live, _html} = live(conn, Routes.session_keys_show_path(conn, :show, session_keys))

      assert show_live |> element("a", "Edit") |> render_click() =~
               "Edit Session keys"

      assert_patch(show_live, Routes.session_keys_show_path(conn, :edit, session_keys))

      assert show_live
             |> form("#session_keys-form", session_keys: @invalid_attrs)
             |> render_change() =~ "can&#39;t be blank"

      {:ok, _, html} =
        show_live
        |> form("#session_keys-form", session_keys: @update_attrs)
        |> render_submit()
        |> follow_redirect(conn, Routes.session_keys_show_path(conn, :show, session_keys))

      assert html =~ "Session keys updated successfully"
      assert html =~ "some updated key_id"
    end
  end
end
