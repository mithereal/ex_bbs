defmodule ApiWeb.AdminDashboardLiveTest do
  use ApiWeb.ConnCase

  import Phoenix.LiveViewTest
  import Api.AccountsFixtures

  test "disconnected and connected render without authentication should redirect to login page",
       %{conn: conn} do
    # If we don't previously log in we will be redirected to the login page
    assert {:error, {:redirect, %{to: "/user/log_in"}}} = live(conn, "/admin")
  end

  test "disconnected and connected render authenticated with user role should redirect to index page",
       %{
         conn: conn
       } do
    conn = conn |> log_in_user(user_fixture())
    assert {:error, {:redirect, %{to: "/"}}} = live(conn, "/admin")
  end

  test "disconnected and connected render authenticated with admin role should redirect to index page",
       %{
         conn: conn
       } do
    conn = conn |> log_in_user(admin_fixture())
    {:ok, admin, disconnected_html} = live(conn, "/admin")
    assert disconnected_html =~ "Welcome to the admin dashboard!"
    assert render(admin) =~ "Welcome to the admin dashboard!"
  end

  test "logs out when force logout on logged user", %{
    conn: conn
  } do
    admin = admin_fixture()
    conn = conn |> log_in_user(admin)

    {:ok, admin, disconnected_html} = live(conn, "/admin")
    assert disconnected_html =~ "Welcome to the admin dashboard!"
    assert render(admin) =~ "Welcome to the admin dashboard!"

    Api.Accounts.logout_user(admin)

    # Assert our liveview process is down
    ref = Process.monitor(admin.pid)
    assert_receive {:DOWN, ^ref, _, _, _}
    refute Process.alive?(admin.pid)

    # Assert our liveview was redirected, following first to /users/force_logout, then to "/", and then to "/users/log_in"
    assert_redirect(admin, "/users/force_logout")

    conn = get(conn, "/users/force_logout")
    assert "/" = redir_path = redirected_to(conn, 302)
    conn = get(recycle(conn), redir_path)

    assert "/users/log_in" = redir_path = redirected_to(conn, 302)
    conn = get(recycle(conn), redir_path)

    assert html_response(conn, 200) =~
             "You were logged out. Please login again to continue using our application."
  end

  test "doesn't log out when force logout on another user", %{
    conn: conn
  } do
    admin1 = admin_fixture()
    admin2 = admin_fixture()
    conn = conn |> log_in_user(admin1)

    {:error, _} = live(conn, "/admin")
  end
end
