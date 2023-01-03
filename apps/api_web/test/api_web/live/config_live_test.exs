defmodule ApiWeb.ConfigLiveTest do
  use ApiWeb.ConnCase

  import Phoenix.LiveViewTest
  import Api.Bbs.SchemaFixtures

  @create_attrs %{config_name: "some config_name", config_value: "some config_value"}
  @update_attrs %{config_name: "some updated config_name", config_value: "some updated config_value"}
  @invalid_attrs %{config_name: nil, config_value: nil}

  defp create_config(_) do
    config = config_fixture()
    %{config: config}
  end

  describe "Index" do
    setup [:create_config]

    test "lists all config", %{conn: conn, config: config} do
      {:ok, _index_live, html} = live(conn, Routes.config_index_path(conn, :index))

      assert html =~ "Listing Config"
      assert html =~ config.config_name
    end

    test "saves new config", %{conn: conn} do
      {:ok, index_live, _html} = live(conn, Routes.config_index_path(conn, :index))

      assert index_live |> element("a", "New Config") |> render_click() =~
               "New Config"

      assert_patch(index_live, Routes.config_index_path(conn, :new))

      assert index_live
             |> form("#config-form", config: @invalid_attrs)
             |> render_change() =~ "can&#39;t be blank"

      {:ok, _, html} =
        index_live
        |> form("#config-form", config: @create_attrs)
        |> render_submit()
        |> follow_redirect(conn, Routes.config_index_path(conn, :index))

      assert html =~ "Config created successfully"
      assert html =~ "some config_name"
    end

    test "updates config in listing", %{conn: conn, config: config} do
      {:ok, index_live, _html} = live(conn, Routes.config_index_path(conn, :index))

      assert index_live |> element("#config-#{config.id} a", "Edit") |> render_click() =~
               "Edit Config"

      assert_patch(index_live, Routes.config_index_path(conn, :edit, config))

      assert index_live
             |> form("#config-form", config: @invalid_attrs)
             |> render_change() =~ "can&#39;t be blank"

      {:ok, _, html} =
        index_live
        |> form("#config-form", config: @update_attrs)
        |> render_submit()
        |> follow_redirect(conn, Routes.config_index_path(conn, :index))

      assert html =~ "Config updated successfully"
      assert html =~ "some updated config_name"
    end

    test "deletes config in listing", %{conn: conn, config: config} do
      {:ok, index_live, _html} = live(conn, Routes.config_index_path(conn, :index))

      assert index_live |> element("#config-#{config.id} a", "Delete") |> render_click()
      refute has_element?(index_live, "#config-#{config.id}")
    end
  end

  describe "Show" do
    setup [:create_config]

    test "displays config", %{conn: conn, config: config} do
      {:ok, _show_live, html} = live(conn, Routes.config_show_path(conn, :show, config))

      assert html =~ "Show Config"
      assert html =~ config.config_name
    end

    test "updates config within modal", %{conn: conn, config: config} do
      {:ok, show_live, _html} = live(conn, Routes.config_show_path(conn, :show, config))

      assert show_live |> element("a", "Edit") |> render_click() =~
               "Edit Config"

      assert_patch(show_live, Routes.config_show_path(conn, :edit, config))

      assert show_live
             |> form("#config-form", config: @invalid_attrs)
             |> render_change() =~ "can&#39;t be blank"

      {:ok, _, html} =
        show_live
        |> form("#config-form", config: @update_attrs)
        |> render_submit()
        |> follow_redirect(conn, Routes.config_show_path(conn, :show, config))

      assert html =~ "Config updated successfully"
      assert html =~ "some updated config_name"
    end
  end
end
