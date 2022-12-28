defmodule ApiWeb.ThemeNameLiveTest do
  use ApiWeb.ConnCase

  import Phoenix.LiveViewTest
  import Api.DatabaseFixtures

  @create_attrs %{fontcolor1_name: "some fontcolor1_name", fontcolor2_name: "some fontcolor2_name", fontcolor3_name: "some fontcolor3_name", fontface1_name: "some fontface1_name", fontface2_name: "some fontface2_name", fontface3_name: "some fontface3_name", fontsize1_name: "some fontsize1_name", fontsize2_name: "some fontsize2_name", fontsize3_name: "some fontsize3_name", span_class1_name: "some span_class1_name", span_class2_name: "some span_class2_name", span_class3_name: "some span_class3_name", td_class1_name: "some td_class1_name", td_class2_name: "some td_class2_name", td_class3_name: "some td_class3_name", td_color1_name: "some td_color1_name", td_color2_name: "some td_color2_name", td_color3_name: "some td_color3_name", th_class1_name: "some th_class1_name", th_class2_name: "some th_class2_name", th_class3_name: "some th_class3_name", th_color1_name: "some th_color1_name", th_color2_name: "some th_color2_name", th_color3_name: "some th_color3_name", themes_id: 42, tr_class1_name: "some tr_class1_name", tr_class2_name: "some tr_class2_name", tr_class3_name: "some tr_class3_name", tr_color1_name: "some tr_color1_name", tr_color2_name: "some tr_color2_name", tr_color3_name: "some tr_color3_name"}
  @update_attrs %{fontcolor1_name: "some updated fontcolor1_name", fontcolor2_name: "some updated fontcolor2_name", fontcolor3_name: "some updated fontcolor3_name", fontface1_name: "some updated fontface1_name", fontface2_name: "some updated fontface2_name", fontface3_name: "some updated fontface3_name", fontsize1_name: "some updated fontsize1_name", fontsize2_name: "some updated fontsize2_name", fontsize3_name: "some updated fontsize3_name", span_class1_name: "some updated span_class1_name", span_class2_name: "some updated span_class2_name", span_class3_name: "some updated span_class3_name", td_class1_name: "some updated td_class1_name", td_class2_name: "some updated td_class2_name", td_class3_name: "some updated td_class3_name", td_color1_name: "some updated td_color1_name", td_color2_name: "some updated td_color2_name", td_color3_name: "some updated td_color3_name", th_class1_name: "some updated th_class1_name", th_class2_name: "some updated th_class2_name", th_class3_name: "some updated th_class3_name", th_color1_name: "some updated th_color1_name", th_color2_name: "some updated th_color2_name", th_color3_name: "some updated th_color3_name", themes_id: 43, tr_class1_name: "some updated tr_class1_name", tr_class2_name: "some updated tr_class2_name", tr_class3_name: "some updated tr_class3_name", tr_color1_name: "some updated tr_color1_name", tr_color2_name: "some updated tr_color2_name", tr_color3_name: "some updated tr_color3_name"}
  @invalid_attrs %{fontcolor1_name: nil, fontcolor2_name: nil, fontcolor3_name: nil, fontface1_name: nil, fontface2_name: nil, fontface3_name: nil, fontsize1_name: nil, fontsize2_name: nil, fontsize3_name: nil, span_class1_name: nil, span_class2_name: nil, span_class3_name: nil, td_class1_name: nil, td_class2_name: nil, td_class3_name: nil, td_color1_name: nil, td_color2_name: nil, td_color3_name: nil, th_class1_name: nil, th_class2_name: nil, th_class3_name: nil, th_color1_name: nil, th_color2_name: nil, th_color3_name: nil, themes_id: nil, tr_class1_name: nil, tr_class2_name: nil, tr_class3_name: nil, tr_color1_name: nil, tr_color2_name: nil, tr_color3_name: nil}

  defp create_theme_name(_) do
    theme_name = theme_name_fixture()
    %{theme_name: theme_name}
  end

  describe "Index" do
    setup [:create_theme_name]

    test "lists all themes_name", %{conn: conn, theme_name: theme_name} do
      {:ok, _index_live, html} = live(conn, Routes.theme_name_index_path(conn, :index))

      assert html =~ "Listing Themes name"
      assert html =~ theme_name.fontcolor1_name
    end

    test "saves new theme_name", %{conn: conn} do
      {:ok, index_live, _html} = live(conn, Routes.theme_name_index_path(conn, :index))

      assert index_live |> element("a", "New Theme name") |> render_click() =~
               "New Theme name"

      assert_patch(index_live, Routes.theme_name_index_path(conn, :new))

      assert index_live
             |> form("#theme_name-form", theme_name: @invalid_attrs)
             |> render_change() =~ "can&#39;t be blank"

      {:ok, _, html} =
        index_live
        |> form("#theme_name-form", theme_name: @create_attrs)
        |> render_submit()
        |> follow_redirect(conn, Routes.theme_name_index_path(conn, :index))

      assert html =~ "Theme name created successfully"
      assert html =~ "some fontcolor1_name"
    end

    test "updates theme_name in listing", %{conn: conn, theme_name: theme_name} do
      {:ok, index_live, _html} = live(conn, Routes.theme_name_index_path(conn, :index))

      assert index_live |> element("#theme_name-#{theme_name.id} a", "Edit") |> render_click() =~
               "Edit Theme name"

      assert_patch(index_live, Routes.theme_name_index_path(conn, :edit, theme_name))

      assert index_live
             |> form("#theme_name-form", theme_name: @invalid_attrs)
             |> render_change() =~ "can&#39;t be blank"

      {:ok, _, html} =
        index_live
        |> form("#theme_name-form", theme_name: @update_attrs)
        |> render_submit()
        |> follow_redirect(conn, Routes.theme_name_index_path(conn, :index))

      assert html =~ "Theme name updated successfully"
      assert html =~ "some updated fontcolor1_name"
    end

    test "deletes theme_name in listing", %{conn: conn, theme_name: theme_name} do
      {:ok, index_live, _html} = live(conn, Routes.theme_name_index_path(conn, :index))

      assert index_live |> element("#theme_name-#{theme_name.id} a", "Delete") |> render_click()
      refute has_element?(index_live, "#theme_name-#{theme_name.id}")
    end
  end

  describe "Show" do
    setup [:create_theme_name]

    test "displays theme_name", %{conn: conn, theme_name: theme_name} do
      {:ok, _show_live, html} = live(conn, Routes.theme_name_show_path(conn, :show, theme_name))

      assert html =~ "Show Theme name"
      assert html =~ theme_name.fontcolor1_name
    end

    test "updates theme_name within modal", %{conn: conn, theme_name: theme_name} do
      {:ok, show_live, _html} = live(conn, Routes.theme_name_show_path(conn, :show, theme_name))

      assert show_live |> element("a", "Edit") |> render_click() =~
               "Edit Theme name"

      assert_patch(show_live, Routes.theme_name_show_path(conn, :edit, theme_name))

      assert show_live
             |> form("#theme_name-form", theme_name: @invalid_attrs)
             |> render_change() =~ "can&#39;t be blank"

      {:ok, _, html} =
        show_live
        |> form("#theme_name-form", theme_name: @update_attrs)
        |> render_submit()
        |> follow_redirect(conn, Routes.theme_name_show_path(conn, :show, theme_name))

      assert html =~ "Theme name updated successfully"
      assert html =~ "some updated fontcolor1_name"
    end
  end
end
