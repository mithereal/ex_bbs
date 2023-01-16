defmodule ApiWeb.AbilitiesControllerTest do
  use ApiWeb.ConnCase

  import Api.TerminatorFixtures

  @create_attrs %{id: "7488a646-e31f-11e4-aace-600308960662", identifier: "some identifier", name: "some name"}
  @update_attrs %{id: "7488a646-e31f-11e4-aace-600308960668", identifier: "some updated identifier", name: "some updated name"}
  @invalid_attrs %{id: nil, identifier: nil, name: nil}

  describe "index" do
    test "lists all abilities", %{conn: conn} do
      conn = get(conn, Routes.abilities_path(conn, :index))
      assert html_response(conn, 200) =~ "Listing Abilities"
    end
  end

  describe "new abilities" do
    test "renders form", %{conn: conn} do
      conn = get(conn, Routes.abilities_path(conn, :new))
      assert html_response(conn, 200) =~ "New Abilities"
    end
  end

  describe "create abilities" do
    test "redirects to show when data is valid", %{conn: conn} do
      conn = post(conn, Routes.abilities_path(conn, :create), abilities: @create_attrs)

      assert %{id: id} = redirected_params(conn)
      assert redirected_to(conn) == Routes.abilities_path(conn, :show, id)

      conn = get(conn, Routes.abilities_path(conn, :show, id))
      assert html_response(conn, 200) =~ "Show Abilities"
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post(conn, Routes.abilities_path(conn, :create), abilities: @invalid_attrs)
      assert html_response(conn, 200) =~ "New Abilities"
    end
  end

  describe "edit abilities" do
    setup [:create_abilities]

    test "renders form for editing chosen abilities", %{conn: conn, abilities: abilities} do
      conn = get(conn, Routes.abilities_path(conn, :edit, abilities))
      assert html_response(conn, 200) =~ "Edit Abilities"
    end
  end

  describe "update abilities" do
    setup [:create_abilities]

    test "redirects when data is valid", %{conn: conn, abilities: abilities} do
      conn = put(conn, Routes.abilities_path(conn, :update, abilities), abilities: @update_attrs)
      assert redirected_to(conn) == Routes.abilities_path(conn, :show, abilities)

      conn = get(conn, Routes.abilities_path(conn, :show, abilities))
      assert html_response(conn, 200) =~ "some updated identifier"
    end

    test "renders errors when data is invalid", %{conn: conn, abilities: abilities} do
      conn = put(conn, Routes.abilities_path(conn, :update, abilities), abilities: @invalid_attrs)
      assert html_response(conn, 200) =~ "Edit Abilities"
    end
  end

  describe "delete abilities" do
    setup [:create_abilities]

    test "deletes chosen abilities", %{conn: conn, abilities: abilities} do
      conn = delete(conn, Routes.abilities_path(conn, :delete, abilities))
      assert redirected_to(conn) == Routes.abilities_path(conn, :index)

      assert_error_sent 404, fn ->
        get(conn, Routes.abilities_path(conn, :show, abilities))
      end
    end
  end

  defp create_abilities(_) do
    abilities = abilities_fixture()
    %{abilities: abilities}
  end
end
