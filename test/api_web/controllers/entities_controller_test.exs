defmodule ApiWeb.EntitiesControllerTest do
  use ApiWeb.ConnCase

  import Api.TerminatorFixtures

  @create_attrs %{abilities: "some abilities", assoc_type: "some assoc_type", id: "7488a646-e31f-11e4-aace-600308960662"}
  @update_attrs %{abilities: "some updated abilities", assoc_type: "some updated assoc_type", id: "7488a646-e31f-11e4-aace-600308960668"}
  @invalid_attrs %{abilities: nil, assoc_type: nil, id: nil}

  describe "index" do
    test "lists all entities", %{conn: conn} do
      conn = get(conn, Routes.entities_path(conn, :index))
      assert html_response(conn, 200) =~ "Listing Entities"
    end
  end

  describe "new entities" do
    test "renders form", %{conn: conn} do
      conn = get(conn, Routes.entities_path(conn, :new))
      assert html_response(conn, 200) =~ "New Entities"
    end
  end

  describe "create entities" do
    test "redirects to show when data is valid", %{conn: conn} do
      conn = post(conn, Routes.entities_path(conn, :create), entities: @create_attrs)

      assert %{id: id} = redirected_params(conn)
      assert redirected_to(conn) == Routes.entities_path(conn, :show, id)

      conn = get(conn, Routes.entities_path(conn, :show, id))
      assert html_response(conn, 200) =~ "Show Entities"
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post(conn, Routes.entities_path(conn, :create), entities: @invalid_attrs)
      assert html_response(conn, 200) =~ "New Entities"
    end
  end

  describe "edit entities" do
    setup [:create_entities]

    test "renders form for editing chosen entities", %{conn: conn, entities: entities} do
      conn = get(conn, Routes.entities_path(conn, :edit, entities))
      assert html_response(conn, 200) =~ "Edit Entities"
    end
  end

  describe "update entities" do
    setup [:create_entities]

    test "redirects when data is valid", %{conn: conn, entities: entities} do
      conn = put(conn, Routes.entities_path(conn, :update, entities), entities: @update_attrs)
      assert redirected_to(conn) == Routes.entities_path(conn, :show, entities)

      conn = get(conn, Routes.entities_path(conn, :show, entities))
      assert html_response(conn, 200) =~ "some updated abilities"
    end

    test "renders errors when data is invalid", %{conn: conn, entities: entities} do
      conn = put(conn, Routes.entities_path(conn, :update, entities), entities: @invalid_attrs)
      assert html_response(conn, 200) =~ "Edit Entities"
    end
  end

  describe "delete entities" do
    setup [:create_entities]

    test "deletes chosen entities", %{conn: conn, entities: entities} do
      conn = delete(conn, Routes.entities_path(conn, :delete, entities))
      assert redirected_to(conn) == Routes.entities_path(conn, :index)

      assert_error_sent 404, fn ->
        get(conn, Routes.entities_path(conn, :show, entities))
      end
    end
  end

  defp create_entities(_) do
    entities = entities_fixture()
    %{entities: entities}
  end
end
