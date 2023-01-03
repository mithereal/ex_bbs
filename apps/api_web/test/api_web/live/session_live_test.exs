defmodule ApiWeb.SessionLiveTest do
  use ApiWeb.ConnCase

  import Phoenix.LiveViewTest
  import Api.Bbs.SchemaFixtures

  @create_attrs %{session_admin: 42, session_id: "some session_id", session_ip: "some session_ip", session_logged_in: 42, session_page: 42, session_start: 42, session_time: 42, session_user_id: 42}
  @update_attrs %{session_admin: 43, session_id: "some updated session_id", session_ip: "some updated session_ip", session_logged_in: 43, session_page: 43, session_start: 43, session_time: 43, session_user_id: 43}
  @invalid_attrs %{session_admin: nil, session_id: nil, session_ip: nil, session_logged_in: nil, session_page: nil, session_start: nil, session_time: nil, session_user_id: nil}

  defp create_session(_) do
    session = session_fixture()
    %{session: session}
  end

  describe "Index" do
    setup [:create_session]

    test "lists all sessions", %{conn: conn, session: session} do
      {:ok, _index_live, html} = live(conn, Routes.session_index_path(conn, :index))

      assert html =~ "Listing Sessions"
      assert html =~ session.session_id
    end

    test "saves new session", %{conn: conn} do
      {:ok, index_live, _html} = live(conn, Routes.session_index_path(conn, :index))

      assert index_live |> element("a", "New Session") |> render_click() =~
               "New Session"

      assert_patch(index_live, Routes.session_index_path(conn, :new))

      assert index_live
             |> form("#session-form", session: @invalid_attrs)
             |> render_change() =~ "can&#39;t be blank"

      {:ok, _, html} =
        index_live
        |> form("#session-form", session: @create_attrs)
        |> render_submit()
        |> follow_redirect(conn, Routes.session_index_path(conn, :index))

      assert html =~ "Session created successfully"
      assert html =~ "some session_id"
    end

    test "updates session in listing", %{conn: conn, session: session} do
      {:ok, index_live, _html} = live(conn, Routes.session_index_path(conn, :index))

      assert index_live |> element("#session-#{session.id} a", "Edit") |> render_click() =~
               "Edit Session"

      assert_patch(index_live, Routes.session_index_path(conn, :edit, session))

      assert index_live
             |> form("#session-form", session: @invalid_attrs)
             |> render_change() =~ "can&#39;t be blank"

      {:ok, _, html} =
        index_live
        |> form("#session-form", session: @update_attrs)
        |> render_submit()
        |> follow_redirect(conn, Routes.session_index_path(conn, :index))

      assert html =~ "Session updated successfully"
      assert html =~ "some updated session_id"
    end

    test "deletes session in listing", %{conn: conn, session: session} do
      {:ok, index_live, _html} = live(conn, Routes.session_index_path(conn, :index))

      assert index_live |> element("#session-#{session.id} a", "Delete") |> render_click()
      refute has_element?(index_live, "#session-#{session.id}")
    end
  end

  describe "Show" do
    setup [:create_session]

    test "displays session", %{conn: conn, session: session} do
      {:ok, _show_live, html} = live(conn, Routes.session_show_path(conn, :show, session))

      assert html =~ "Show Session"
      assert html =~ session.session_id
    end

    test "updates session within modal", %{conn: conn, session: session} do
      {:ok, show_live, _html} = live(conn, Routes.session_show_path(conn, :show, session))

      assert show_live |> element("a", "Edit") |> render_click() =~
               "Edit Session"

      assert_patch(show_live, Routes.session_show_path(conn, :edit, session))

      assert show_live
             |> form("#session-form", session: @invalid_attrs)
             |> render_change() =~ "can&#39;t be blank"

      {:ok, _, html} =
        show_live
        |> form("#session-form", session: @update_attrs)
        |> render_submit()
        |> follow_redirect(conn, Routes.session_show_path(conn, :show, session))

      assert html =~ "Session updated successfully"
      assert html =~ "some updated session_id"
    end
  end
end
