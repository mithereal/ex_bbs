defmodule ApiWeb.ThemeLiveTest do
  use ApiWeb.ConnCase

  import Phoenix.LiveViewTest
  import Api.DatabaseFixtures

  @create_attrs %{tr_color3: "some tr_color3", body_vlink: "some body_vlink", img_size_privmsg: 42, td_color1: "some td_color1", fontcolor3: "some fontcolor3", body_background: "some body_background", td_class3: "some td_class3", template_name: "some template_name", tr_class2: "some tr_class2", th_class3: "some th_class3", tr_color2: "some tr_color2", tr_class3: "some tr_class3", tr_class1: "some tr_class1", fontface2: "some fontface2", th_color1: "some th_color1", th_class2: "some th_class2", themes_id: "some themes_id", td_class1: "some td_class1", body_text: "some body_text", th_color2: "some th_color2", body_link: "some body_link", tr_color1: "some tr_color1", td_class2: "some td_class2", td_color2: "some td_color2", fontsize2: 42, fontface3: "some fontface3", fontcolor2: "some fontcolor2", body_bgcolor: "some body_bgcolor", fontsize3: 42, fontface1: "some fontface1", fontcolor1: "some fontcolor1", span_class3: "some span_class3", span_class2: "some span_class2", th_color3: "some th_color3", body_alink: "some body_alink", td_color3: "some td_color3", fontsize1: 42, head_stylesheet: "some head_stylesheet", style_name: "some style_name", th_class1: "some th_class1", span_class1: "some span_class1", body_hlink: "some body_hlink", img_size_poll: 42}
  @update_attrs %{tr_color3: "some updated tr_color3", body_vlink: "some updated body_vlink", img_size_privmsg: 43, td_color1: "some updated td_color1", fontcolor3: "some updated fontcolor3", body_background: "some updated body_background", td_class3: "some updated td_class3", template_name: "some updated template_name", tr_class2: "some updated tr_class2", th_class3: "some updated th_class3", tr_color2: "some updated tr_color2", tr_class3: "some updated tr_class3", tr_class1: "some updated tr_class1", fontface2: "some updated fontface2", th_color1: "some updated th_color1", th_class2: "some updated th_class2", themes_id: "some updated themes_id", td_class1: "some updated td_class1", body_text: "some updated body_text", th_color2: "some updated th_color2", body_link: "some updated body_link", tr_color1: "some updated tr_color1", td_class2: "some updated td_class2", td_color2: "some updated td_color2", fontsize2: 43, fontface3: "some updated fontface3", fontcolor2: "some updated fontcolor2", body_bgcolor: "some updated body_bgcolor", fontsize3: 43, fontface1: "some updated fontface1", fontcolor1: "some updated fontcolor1", span_class3: "some updated span_class3", span_class2: "some updated span_class2", th_color3: "some updated th_color3", body_alink: "some updated body_alink", td_color3: "some updated td_color3", fontsize1: 43, head_stylesheet: "some updated head_stylesheet", style_name: "some updated style_name", th_class1: "some updated th_class1", span_class1: "some updated span_class1", body_hlink: "some updated body_hlink", img_size_poll: 43}
  @invalid_attrs %{tr_color3: nil, body_vlink: nil, img_size_privmsg: nil, td_color1: nil, fontcolor3: nil, body_background: nil, td_class3: nil, template_name: nil, tr_class2: nil, th_class3: nil, tr_color2: nil, tr_class3: nil, tr_class1: nil, fontface2: nil, th_color1: nil, th_class2: nil, themes_id: nil, td_class1: nil, body_text: nil, th_color2: nil, body_link: nil, tr_color1: nil, td_class2: nil, td_color2: nil, fontsize2: nil, fontface3: nil, fontcolor2: nil, body_bgcolor: nil, fontsize3: nil, fontface1: nil, fontcolor1: nil, span_class3: nil, span_class2: nil, th_color3: nil, body_alink: nil, td_color3: nil, fontsize1: nil, head_stylesheet: nil, style_name: nil, th_class1: nil, span_class1: nil, body_hlink: nil, img_size_poll: nil}

  defp create_theme(_) do
    theme = theme_fixture()
    %{theme: theme}
  end

  describe "Index" do
    setup [:create_theme]

    test "lists all themes", %{conn: conn, theme: theme} do
      {:ok, _index_live, html} = live(conn, Routes.theme_index_path(conn, :index))

      assert html =~ "Listing Themes"
      assert html =~ theme.tr_color3
    end

    test "saves new theme", %{conn: conn} do
      {:ok, index_live, _html} = live(conn, Routes.theme_index_path(conn, :index))

      assert index_live |> element("a", "New Theme") |> render_click() =~
               "New Theme"

      assert_patch(index_live, Routes.theme_index_path(conn, :new))

      assert index_live
             |> form("#theme-form", theme: @invalid_attrs)
             |> render_change() =~ "can&#39;t be blank"

      {:ok, _, html} =
        index_live
        |> form("#theme-form", theme: @create_attrs)
        |> render_submit()
        |> follow_redirect(conn, Routes.theme_index_path(conn, :index))

      assert html =~ "Theme created successfully"
      assert html =~ "some tr_color3"
    end

    test "updates theme in listing", %{conn: conn, theme: theme} do
      {:ok, index_live, _html} = live(conn, Routes.theme_index_path(conn, :index))

      assert index_live |> element("#theme-#{theme.id} a", "Edit") |> render_click() =~
               "Edit Theme"

      assert_patch(index_live, Routes.theme_index_path(conn, :edit, theme))

      assert index_live
             |> form("#theme-form", theme: @invalid_attrs)
             |> render_change() =~ "can&#39;t be blank"

      {:ok, _, html} =
        index_live
        |> form("#theme-form", theme: @update_attrs)
        |> render_submit()
        |> follow_redirect(conn, Routes.theme_index_path(conn, :index))

      assert html =~ "Theme updated successfully"
      assert html =~ "some updated tr_color3"
    end

    test "deletes theme in listing", %{conn: conn, theme: theme} do
      {:ok, index_live, _html} = live(conn, Routes.theme_index_path(conn, :index))

      assert index_live |> element("#theme-#{theme.id} a", "Delete") |> render_click()
      refute has_element?(index_live, "#theme-#{theme.id}")
    end
  end

  describe "Show" do
    setup [:create_theme]

    test "displays theme", %{conn: conn, theme: theme} do
      {:ok, _show_live, html} = live(conn, Routes.theme_show_path(conn, :show, theme))

      assert html =~ "Show Theme"
      assert html =~ theme.tr_color3
    end

    test "updates theme within modal", %{conn: conn, theme: theme} do
      {:ok, show_live, _html} = live(conn, Routes.theme_show_path(conn, :show, theme))

      assert show_live |> element("a", "Edit") |> render_click() =~
               "Edit Theme"

      assert_patch(show_live, Routes.theme_show_path(conn, :edit, theme))

      assert show_live
             |> form("#theme-form", theme: @invalid_attrs)
             |> render_change() =~ "can&#39;t be blank"

      {:ok, _, html} =
        show_live
        |> form("#theme-form", theme: @update_attrs)
        |> render_submit()
        |> follow_redirect(conn, Routes.theme_show_path(conn, :show, theme))

      assert html =~ "Theme updated successfully"
      assert html =~ "some updated tr_color3"
    end
  end
end
