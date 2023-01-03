defmodule ApiWeb.TopicWatchLiveTest do
  use ApiWeb.ConnCase

  import Phoenix.LiveViewTest
  import Api.Bbs.SchemaFixtures

  @create_attrs %{notify_status: 42, topic_id: 42, user_id: 42}
  @update_attrs %{notify_status: 43, topic_id: 43, user_id: 43}
  @invalid_attrs %{notify_status: nil, topic_id: nil, user_id: nil}

  defp create_topic_watch(_) do
    topic_watch = topic_watch_fixture()
    %{topic_watch: topic_watch}
  end

  describe "Index" do
    setup [:create_topic_watch]

    test "lists all topics_watch", %{conn: conn} do
      {:ok, _index_live, html} = live(conn, Routes.topic_watch_index_path(conn, :index))

      assert html =~ "Listing Topics watch"
    end

    test "saves new topic_watch", %{conn: conn} do
      {:ok, index_live, _html} = live(conn, Routes.topic_watch_index_path(conn, :index))

      assert index_live |> element("a", "New Topic watch") |> render_click() =~
               "New Topic watch"

      assert_patch(index_live, Routes.topic_watch_index_path(conn, :new))

      assert index_live
             |> form("#topic_watch-form", topic_watch: @invalid_attrs)
             |> render_change() =~ "can&#39;t be blank"

      {:ok, _, html} =
        index_live
        |> form("#topic_watch-form", topic_watch: @create_attrs)
        |> render_submit()
        |> follow_redirect(conn, Routes.topic_watch_index_path(conn, :index))

      assert html =~ "Topic watch created successfully"
    end

    test "updates topic_watch in listing", %{conn: conn, topic_watch: topic_watch} do
      {:ok, index_live, _html} = live(conn, Routes.topic_watch_index_path(conn, :index))

      assert index_live |> element("#topic_watch-#{topic_watch.id} a", "Edit") |> render_click() =~
               "Edit Topic watch"

      assert_patch(index_live, Routes.topic_watch_index_path(conn, :edit, topic_watch))

      assert index_live
             |> form("#topic_watch-form", topic_watch: @invalid_attrs)
             |> render_change() =~ "can&#39;t be blank"

      {:ok, _, html} =
        index_live
        |> form("#topic_watch-form", topic_watch: @update_attrs)
        |> render_submit()
        |> follow_redirect(conn, Routes.topic_watch_index_path(conn, :index))

      assert html =~ "Topic watch updated successfully"
    end

    test "deletes topic_watch in listing", %{conn: conn, topic_watch: topic_watch} do
      {:ok, index_live, _html} = live(conn, Routes.topic_watch_index_path(conn, :index))

      assert index_live |> element("#topic_watch-#{topic_watch.id} a", "Delete") |> render_click()
      refute has_element?(index_live, "#topic_watch-#{topic_watch.id}")
    end
  end

  describe "Show" do
    setup [:create_topic_watch]

    test "displays topic_watch", %{conn: conn, topic_watch: topic_watch} do
      {:ok, _show_live, html} = live(conn, Routes.topic_watch_show_path(conn, :show, topic_watch))

      assert html =~ "Show Topic watch"
    end

    test "updates topic_watch within modal", %{conn: conn, topic_watch: topic_watch} do
      {:ok, show_live, _html} = live(conn, Routes.topic_watch_show_path(conn, :show, topic_watch))

      assert show_live |> element("a", "Edit") |> render_click() =~
               "Edit Topic watch"

      assert_patch(show_live, Routes.topic_watch_show_path(conn, :edit, topic_watch))

      assert show_live
             |> form("#topic_watch-form", topic_watch: @invalid_attrs)
             |> render_change() =~ "can&#39;t be blank"

      {:ok, _, html} =
        show_live
        |> form("#topic_watch-form", topic_watch: @update_attrs)
        |> render_submit()
        |> follow_redirect(conn, Routes.topic_watch_show_path(conn, :show, topic_watch))

      assert html =~ "Topic watch updated successfully"
    end
  end
end
