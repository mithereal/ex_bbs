defmodule ApiWeb.PerformerControllerTest do
  use ApiWeb.ConnCase

  import Api.TerminatorFixtures

  @create_attrs %{abilities: [], id: "7488a646-e31f-11e4-aace-600308960662"}
  @update_attrs %{abilities: [], id: "7488a646-e31f-11e4-aace-600308960668"}
  @invalid_attrs %{abilities: nil, id: nil}

  describe "index" do
    test "lists all performers", %{conn: conn} do
      conn = get(conn, Routes.performer_path(conn, :index))
      assert html_response(conn, 200) =~ "Listing Performers"
    end
  end

  describe "new performer" do
    test "renders form", %{conn: conn} do
      conn = get(conn, Routes.performer_path(conn, :new))
      assert html_response(conn, 200) =~ "New Performer"
    end
  end

  describe "create performer" do
    test "redirects to show when data is valid", %{conn: conn} do
      conn = post(conn, Routes.performer_path(conn, :create), performer: @create_attrs)

      assert %{id: id} = redirected_params(conn)
      assert redirected_to(conn) == Routes.performer_path(conn, :show, id)

      conn = get(conn, Routes.performer_path(conn, :show, id))
      assert html_response(conn, 200) =~ "Show Performer"
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post(conn, Routes.performer_path(conn, :create), performer: @invalid_attrs)
      assert html_response(conn, 200) =~ "New Performer"
    end
  end

  describe "edit performer" do
    setup [:create_performer]

    test "renders form for editing chosen performer", %{conn: conn, performer: performer} do
      conn = get(conn, Routes.performer_path(conn, :edit, performer))
      assert html_response(conn, 200) =~ "Edit Performer"
    end
  end

  describe "update performer" do
    setup [:create_performer]

    test "redirects when data is valid", %{conn: conn, performer: performer} do
      conn = put(conn, Routes.performer_path(conn, :update, performer), performer: @update_attrs)
      assert redirected_to(conn) == Routes.performer_path(conn, :show, performer)

      conn = get(conn, Routes.performer_path(conn, :show, performer))
      assert html_response(conn, 200)
    end

    test "renders errors when data is invalid", %{conn: conn, performer: performer} do
      conn = put(conn, Routes.performer_path(conn, :update, performer), performer: @invalid_attrs)
      assert html_response(conn, 200) =~ "Edit Performer"
    end
  end

  describe "delete performer" do
    setup [:create_performer]

    test "deletes chosen performer", %{conn: conn, performer: performer} do
      conn = delete(conn, Routes.performer_path(conn, :delete, performer))
      assert redirected_to(conn) == Routes.performer_path(conn, :index)

      assert_error_sent 404, fn ->
        get(conn, Routes.performer_path(conn, :show, performer))
      end
    end
  end

  defp create_performer(_) do
    performer = performer_fixture()
    %{performer: performer}
  end
end
