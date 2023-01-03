defmodule ApiWeb.UserLiveTest do
  use ApiWeb.ConnCase

  import Phoenix.LiveViewTest
  import Api.Bbs.SchemaFixtures

  @create_attrs %{user_login_tries: 42, user_timezone: "some user_timezone", user_allowhtml: 42, user_posts: 42, user_occ: "some user_occ", user_allow_pm: 42, user_allowsmile: 42, user_interests: "some user_interests", user_website: "some user_website", user_session_time: 42, user_emailtime: 42, user_avatar: "some user_avatar", user_sig_bbcode_uid: "some user_sig_bbcode_uid", user_viewemail: 42, user_sig: "some user_sig", user_allowbbcode: 42, user_last_login_try: 42, user_aim: "some user_aim", user_lang: "some user_lang", user_allowavatar: 42, user_new_privmsg: 42, user_allow_viewonline: 42, user_from: "some user_from", user_msnm: "some user_msnm", user_id: 42, user_active: 42, user_attachsig: 42, user_avatar_type: 42, user_actkey: "some user_actkey", user_level: 42, username: "some username", user_regdate: 42, user_last_privmsg: 42, user_email: "some user_email", user_unread_privmsg: 42, user_style: 42, user_session_page: 42, user_newpasswd: "some user_newpasswd", user_password: "some user_password", user_lastvisit: 42, user_popup_pm: 42, user_rank: 42, user_dateformat: "some user_dateformat", user_icq: "some user_icq", user_notify_pm: 42, user_notify: 42, user_yim: "some user_yim"}
  @update_attrs %{user_login_tries: 43, user_timezone: "some updated user_timezone", user_allowhtml: 43, user_posts: 43, user_occ: "some updated user_occ", user_allow_pm: 43, user_allowsmile: 43, user_interests: "some updated user_interests", user_website: "some updated user_website", user_session_time: 43, user_emailtime: 43, user_avatar: "some updated user_avatar", user_sig_bbcode_uid: "some updated user_sig_bbcode_uid", user_viewemail: 43, user_sig: "some updated user_sig", user_allowbbcode: 43, user_last_login_try: 43, user_aim: "some updated user_aim", user_lang: "some updated user_lang", user_allowavatar: 43, user_new_privmsg: 43, user_allow_viewonline: 43, user_from: "some updated user_from", user_msnm: "some updated user_msnm", user_id: 43, user_active: 43, user_attachsig: 43, user_avatar_type: 43, user_actkey: "some updated user_actkey", user_level: 43, username: "some updated username", user_regdate: 43, user_last_privmsg: 43, user_email: "some updated user_email", user_unread_privmsg: 43, user_style: 43, user_session_page: 43, user_newpasswd: "some updated user_newpasswd", user_password: "some updated user_password", user_lastvisit: 43, user_popup_pm: 43, user_rank: 43, user_dateformat: "some updated user_dateformat", user_icq: "some updated user_icq", user_notify_pm: 43, user_notify: 43, user_yim: "some updated user_yim"}
  @invalid_attrs %{user_login_tries: nil, user_timezone: nil, user_allowhtml: nil, user_posts: nil, user_occ: nil, user_allow_pm: nil, user_allowsmile: nil, user_interests: nil, user_website: nil, user_session_time: nil, user_emailtime: nil, user_avatar: nil, user_sig_bbcode_uid: nil, user_viewemail: nil, user_sig: nil, user_allowbbcode: nil, user_last_login_try: nil, user_aim: nil, user_lang: nil, user_allowavatar: nil, user_new_privmsg: nil, user_allow_viewonline: nil, user_from: nil, user_msnm: nil, user_id: nil, user_active: nil, user_attachsig: nil, user_avatar_type: nil, user_actkey: nil, user_level: nil, username: nil, user_regdate: nil, user_last_privmsg: nil, user_email: nil, user_unread_privmsg: nil, user_style: nil, user_session_page: nil, user_newpasswd: nil, user_password: nil, user_lastvisit: nil, user_popup_pm: nil, user_rank: nil, user_dateformat: nil, user_icq: nil, user_notify_pm: nil, user_notify: nil, user_yim: nil}

  defp create_user(_) do
    user = user_fixture()
    %{user: user}
  end

  describe "Index" do
    setup [:create_user]

    test "lists all users", %{conn: conn, user: user} do
      {:ok, _index_live, html} = live(conn, Routes.user_index_path(conn, :index))

      assert html =~ "Listing Users"
      assert html =~ user.user_timezone
    end

    test "saves new user", %{conn: conn} do
      {:ok, index_live, _html} = live(conn, Routes.user_index_path(conn, :index))

      assert index_live |> element("a", "New User") |> render_click() =~
               "New User"

      assert_patch(index_live, Routes.user_index_path(conn, :new))

      assert index_live
             |> form("#user-form", user: @invalid_attrs)
             |> render_change() =~ "can&#39;t be blank"

      {:ok, _, html} =
        index_live
        |> form("#user-form", user: @create_attrs)
        |> render_submit()
        |> follow_redirect(conn, Routes.user_index_path(conn, :index))

      assert html =~ "User created successfully"
      assert html =~ "some user_timezone"
    end

    test "updates user in listing", %{conn: conn, user: user} do
      {:ok, index_live, _html} = live(conn, Routes.user_index_path(conn, :index))

      assert index_live |> element("#user-#{user.id} a", "Edit") |> render_click() =~
               "Edit User"

      assert_patch(index_live, Routes.user_index_path(conn, :edit, user))

      assert index_live
             |> form("#user-form", user: @invalid_attrs)
             |> render_change() =~ "can&#39;t be blank"

      {:ok, _, html} =
        index_live
        |> form("#user-form", user: @update_attrs)
        |> render_submit()
        |> follow_redirect(conn, Routes.user_index_path(conn, :index))

      assert html =~ "User updated successfully"
      assert html =~ "some updated user_timezone"
    end

    test "deletes user in listing", %{conn: conn, user: user} do
      {:ok, index_live, _html} = live(conn, Routes.user_index_path(conn, :index))

      assert index_live |> element("#user-#{user.id} a", "Delete") |> render_click()
      refute has_element?(index_live, "#user-#{user.id}")
    end
  end

  describe "Show" do
    setup [:create_user]

    test "displays user", %{conn: conn, user: user} do
      {:ok, _show_live, html} = live(conn, Routes.user_show_path(conn, :show, user))

      assert html =~ "Show User"
      assert html =~ user.user_timezone
    end

    test "updates user within modal", %{conn: conn, user: user} do
      {:ok, show_live, _html} = live(conn, Routes.user_show_path(conn, :show, user))

      assert show_live |> element("a", "Edit") |> render_click() =~
               "Edit User"

      assert_patch(show_live, Routes.user_show_path(conn, :edit, user))

      assert show_live
             |> form("#user-form", user: @invalid_attrs)
             |> render_change() =~ "can&#39;t be blank"

      {:ok, _, html} =
        show_live
        |> form("#user-form", user: @update_attrs)
        |> render_submit()
        |> follow_redirect(conn, Routes.user_show_path(conn, :show, user))

      assert html =~ "User updated successfully"
      assert html =~ "some updated user_timezone"
    end
  end
end
