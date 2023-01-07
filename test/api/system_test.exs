defmodule Api.SystemTest do
  use Api.DataCase

  alias Api.System

  describe "settings" do
    alias Api.System.Setting

    import Api.SystemFixtures

    @invalid_attrs %{key: nil, name: nil, type: nil, value: nil}

    test "list_settings/0 returns all settings" do
      setting = setting_fixture()
      assert System.list_settings() == [setting]
    end

    test "get_setting!/1 returns the setting with given id" do
      setting = setting_fixture()
      assert System.get_setting!(setting.id) == setting
    end

    test "create_setting/1 with valid data creates a setting" do
      valid_attrs = %{key: "some key", name: "some name", type: "some type", value: "some value"}

      assert {:ok, %Setting{} = setting} = System.create_setting(valid_attrs)
      assert setting.key == "some key"
      assert setting.name == "some name"
      assert setting.type == "some type"
      assert setting.value == "some value"
    end

    test "create_setting/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = System.create_setting(@invalid_attrs)
    end

    test "update_setting/2 with valid data updates the setting" do
      setting = setting_fixture()

      update_attrs = %{
        key: "some updated key",
        name: "some updated name",
        type: "some updated type",
        value: "some updated value"
      }

      assert {:ok, %Setting{} = setting} = System.update_setting(setting, update_attrs)
      assert setting.key == "some updated key"
      assert setting.name == "some updated name"
      assert setting.type == "some updated type"
      assert setting.value == "some updated value"
    end

    test "update_setting/2 with invalid data returns error changeset" do
      setting = setting_fixture()
      assert {:error, %Ecto.Changeset{}} = System.update_setting(setting, @invalid_attrs)
      assert setting == System.get_setting!(setting.id)
    end

    test "delete_setting/1 deletes the setting" do
      setting = setting_fixture()
      assert {:ok, %Setting{}} = System.delete_setting(setting)
      assert_raise Ecto.NoResultsError, fn -> System.get_setting!(setting.id) end
    end

    test "change_setting/1 returns a setting changeset" do
      setting = setting_fixture()
      assert %Ecto.Changeset{} = System.change_setting(setting)
    end
  end
end
