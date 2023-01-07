defmodule ApiWeb.SettingControllerTest do
  use ApiWeb.ConnCase

  import Api.SystemFixtures

  @create_attrs %{key: "some key", name: "some name", type: "some type", value: "some value"}
  @update_attrs %{
    key: "some updated key",
    name: "some updated name",
    type: "some updated type",
    value: "some updated value"
  }
  @invalid_attrs %{key: nil, name: nil, type: nil, value: nil}

  describe "index" do
    test "lists all settings", %{conn: conn} do
      conn = get(conn, Routes.setting_path(conn, :index))
      assert html_response(conn, 200)
    end
  end

  describe "new setting" do
    test "renders form", %{conn: conn} do
      conn = get(conn, Routes.setting_path(conn, :new))
      assert html_response(conn, 200) =~ "New Setting"
    end
  end

  describe "create setting" do
    test "redirects to show when data is valid", %{conn: conn} do
      conn = post(conn, Routes.setting_path(conn, :create), setting: @create_attrs)

      assert %{id: id} = redirected_params(conn)
      assert redirected_to(conn) == Routes.setting_path(conn, :show, id)

      conn = get(conn, Routes.setting_path(conn, :show, id))
      assert html_response(conn, 200)
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post(conn, Routes.setting_path(conn, :create), setting: @invalid_attrs)
      assert html_response(conn, 200)
    end
  end

  describe "edit setting" do
    setup [:create_setting]

    test "renders form for editing chosen setting", %{conn: conn, setting: setting} do
      conn = get(conn, Routes.setting_path(conn, :edit, setting))
      assert html_response(conn, 200)
    end
  end

  describe "update setting" do
    setup [:create_setting]

    test "redirects when data is valid", %{conn: conn, setting: setting} do
      conn = put(conn, Routes.setting_path(conn, :update, setting), setting: @update_attrs)
      assert redirected_to(conn) == Routes.setting_path(conn, :show, setting)

      conn = get(conn, Routes.setting_path(conn, :show, setting))
      assert html_response(conn, 200)
    end

    test "renders errors when data is invalid", %{conn: conn, setting: setting} do
      conn = put(conn, Routes.setting_path(conn, :update, setting), setting: @invalid_attrs)
      assert html_response(conn, 200)
    end
  end

  describe "delete setting" do
    setup [:create_setting]

    test "deletes chosen setting", %{conn: conn, setting: setting} do
      conn = delete(conn, Routes.setting_path(conn, :delete, setting))
      assert redirected_to(conn) == Routes.setting_path(conn, :index)

      assert_error_sent 404, fn ->
        get(conn, Routes.setting_path(conn, :show, setting))
      end
    end
  end

  defp create_setting(_) do
    setting = setting_fixture()
    %{setting: setting}
  end
end
