defmodule ApiWeb.TopicsControllerTest do
  use ApiWeb.ConnCase

  import Api.ForumFixtures

  @create_attrs %{
    description: "some description",
    id: "7488a646-e31f-11e4-aace-600308960662",
    status: 42,
    title: "some title"
  }
  @update_attrs %{
    description: "some updated description",
    id: "7488a646-e31f-11e4-aace-600308960668",
    status: 43,
    title: "some updated title"
  }
  @invalid_attrs %{description: nil, id: nil, status: nil, title: nil}

  describe "index" do
    test "lists all topics", %{conn: conn} do
      conn = get(conn, Routes.topics_path(conn, :index))
      assert html_response(conn, 200) =~ "Listing Topics"
    end
  end

  describe "new topics" do
    test "renders form", %{conn: conn} do
      conn = get(conn, Routes.topics_path(conn, :new))
      assert html_response(conn, 200) =~ "New Topics"
    end
  end

  describe "create topics" do
    test "redirects to show when data is valid", %{conn: conn} do
      conn = post(conn, Routes.topics_path(conn, :create), topics: @create_attrs)

      assert %{id: id} = redirected_params(conn)
      assert redirected_to(conn) == Routes.topics_path(conn, :show, id)

      conn = get(conn, Routes.topics_path(conn, :show, id))
      assert html_response(conn, 200) =~ "Show Topics"
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post(conn, Routes.topics_path(conn, :create), topics: @invalid_attrs)
      assert html_response(conn, 200) =~ "New Topics"
    end
  end

  describe "edit topics" do
    setup [:create_topics]

    test "renders form for editing chosen topics", %{conn: conn, topics: topics} do
      conn = get(conn, Routes.topics_path(conn, :edit, topics))
      assert html_response(conn, 200) =~ "Edit Topics"
    end
  end

  describe "update topics" do
    setup [:create_topics]

    test "redirects when data is valid", %{conn: conn, topics: topics} do
      conn = put(conn, Routes.topics_path(conn, :update, topics), topics: @update_attrs)
      assert redirected_to(conn) == Routes.topics_path(conn, :show, topics)

      conn = get(conn, Routes.topics_path(conn, :show, topics))
      assert html_response(conn, 200) =~ "some updated description"
    end

    test "renders errors when data is invalid", %{conn: conn, topics: topics} do
      conn = put(conn, Routes.topics_path(conn, :update, topics), topics: @invalid_attrs)
      assert html_response(conn, 200) =~ "Edit Topics"
    end
  end

  describe "delete topics" do
    setup [:create_topics]

    test "deletes chosen topics", %{conn: conn, topics: topics} do
      conn = delete(conn, Routes.topics_path(conn, :delete, topics))
      assert redirected_to(conn) == Routes.topics_path(conn, :index)

      assert_error_sent 404, fn ->
        get(conn, Routes.topics_path(conn, :show, topics))
      end
    end
  end

  defp create_topics(_) do
    topics = topics_fixture()
    %{topics: topics}
  end
end
