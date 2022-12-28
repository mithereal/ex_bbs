defmodule ApiWeb.TopicLiveTest do
  use ApiWeb.ConnCase

  import Phoenix.LiveViewTest
  import Api.DatabaseFixtures

  @create_attrs %{forum_id: 42, topic_first_post_id: 42, topic_id: 42, topic_last_post_id: 42, topic_moved_id: 42, topic_poster: 42, topic_replies: 42, topic_status: 42, topic_time: 42, topic_title: "some topic_title", topic_type: 42, topic_views: 42, topic_vote: 42}
  @update_attrs %{forum_id: 43, topic_first_post_id: 43, topic_id: 43, topic_last_post_id: 43, topic_moved_id: 43, topic_poster: 43, topic_replies: 43, topic_status: 43, topic_time: 43, topic_title: "some updated topic_title", topic_type: 43, topic_views: 43, topic_vote: 43}
  @invalid_attrs %{forum_id: nil, topic_first_post_id: nil, topic_id: nil, topic_last_post_id: nil, topic_moved_id: nil, topic_poster: nil, topic_replies: nil, topic_status: nil, topic_time: nil, topic_title: nil, topic_type: nil, topic_views: nil, topic_vote: nil}

  defp create_topic(_) do
    topic = topic_fixture()
    %{topic: topic}
  end

  describe "Index" do
    setup [:create_topic]

    test "lists all topics", %{conn: conn, topic: topic} do
      {:ok, _index_live, html} = live(conn, Routes.topic_index_path(conn, :index))

      assert html =~ "Listing Topics"
      assert html =~ topic.topic_title
    end

    test "saves new topic", %{conn: conn} do
      {:ok, index_live, _html} = live(conn, Routes.topic_index_path(conn, :index))

      assert index_live |> element("a", "New Topic") |> render_click() =~
               "New Topic"

      assert_patch(index_live, Routes.topic_index_path(conn, :new))

      assert index_live
             |> form("#topic-form", topic: @invalid_attrs)
             |> render_change() =~ "can&#39;t be blank"

      {:ok, _, html} =
        index_live
        |> form("#topic-form", topic: @create_attrs)
        |> render_submit()
        |> follow_redirect(conn, Routes.topic_index_path(conn, :index))

      assert html =~ "Topic created successfully"
      assert html =~ "some topic_title"
    end

    test "updates topic in listing", %{conn: conn, topic: topic} do
      {:ok, index_live, _html} = live(conn, Routes.topic_index_path(conn, :index))

      assert index_live |> element("#topic-#{topic.id} a", "Edit") |> render_click() =~
               "Edit Topic"

      assert_patch(index_live, Routes.topic_index_path(conn, :edit, topic))

      assert index_live
             |> form("#topic-form", topic: @invalid_attrs)
             |> render_change() =~ "can&#39;t be blank"

      {:ok, _, html} =
        index_live
        |> form("#topic-form", topic: @update_attrs)
        |> render_submit()
        |> follow_redirect(conn, Routes.topic_index_path(conn, :index))

      assert html =~ "Topic updated successfully"
      assert html =~ "some updated topic_title"
    end

    test "deletes topic in listing", %{conn: conn, topic: topic} do
      {:ok, index_live, _html} = live(conn, Routes.topic_index_path(conn, :index))

      assert index_live |> element("#topic-#{topic.id} a", "Delete") |> render_click()
      refute has_element?(index_live, "#topic-#{topic.id}")
    end
  end

  describe "Show" do
    setup [:create_topic]

    test "displays topic", %{conn: conn, topic: topic} do
      {:ok, _show_live, html} = live(conn, Routes.topic_show_path(conn, :show, topic))

      assert html =~ "Show Topic"
      assert html =~ topic.topic_title
    end

    test "updates topic within modal", %{conn: conn, topic: topic} do
      {:ok, show_live, _html} = live(conn, Routes.topic_show_path(conn, :show, topic))

      assert show_live |> element("a", "Edit") |> render_click() =~
               "Edit Topic"

      assert_patch(show_live, Routes.topic_show_path(conn, :edit, topic))

      assert show_live
             |> form("#topic-form", topic: @invalid_attrs)
             |> render_change() =~ "can&#39;t be blank"

      {:ok, _, html} =
        show_live
        |> form("#topic-form", topic: @update_attrs)
        |> render_submit()
        |> follow_redirect(conn, Routes.topic_show_path(conn, :show, topic))

      assert html =~ "Topic updated successfully"
      assert html =~ "some updated topic_title"
    end
  end
end
