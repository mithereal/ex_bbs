defmodule ApiWeb.TopicsController do
  use ApiWeb, :controller

  alias Api.Forum
  alias Api.Forum.Topics

  def index(conn, _params) do
    topics = Forum.list_topics()
    render(conn, "index.html", topics: topics)
  end

  def new(conn, _params) do
    changeset = Forum.change_topics(%Topics{})
    render(conn, "new.html", changeset: changeset)
  end

  def create(conn, %{"topics" => topics_params}) do
    case Forum.create_topics(topics_params) do
      {:ok, topics} ->
        conn
        |> put_flash(:info, "Topics created successfully.")
        |> redirect(to: Routes.topics_path(conn, :show, topics))

      {:error, %Ecto.Changeset{} = changeset} ->
        render(conn, "new.html", changeset: changeset)
    end
  end

  def show(conn, %{"id" => id}) do
    topics = Forum.get_topics!(id)
    render(conn, "show.html", topics: topics)
  end

  def edit(conn, %{"id" => id}) do
    topics = Forum.get_topics!(id)
    changeset = Forum.change_topics(topics)
    render(conn, "edit.html", topics: topics, changeset: changeset)
  end

  def update(conn, %{"id" => id, "topics" => topics_params}) do
    topics = Forum.get_topics!(id)

    case Forum.update_topics(topics, topics_params) do
      {:ok, topics} ->
        conn
        |> put_flash(:info, "Topics updated successfully.")
        |> redirect(to: Routes.topics_path(conn, :show, topics))

      {:error, %Ecto.Changeset{} = changeset} ->
        render(conn, "edit.html", topics: topics, changeset: changeset)
    end
  end

  def delete(conn, %{"id" => id}) do
    topics = Forum.get_topics!(id)
    {:ok, _topics} = Forum.delete_topics(topics)

    conn
    |> put_flash(:info, "Topics deleted successfully.")
    |> redirect(to: Routes.topics_path(conn, :index))
  end

  alias Api.Forum
  alias Atomex.{Feed, Entry}

  def thread_rss(conn, params) do
    topic = Map.get(params, :topic_slug) || ""
    posts = Forum.get_topic(topic)
    feed = build_feed(posts, conn, :thread_rss)

    conn
    |> put_resp_content_type("text/xml")
    |> send_resp(200, feed)
  end

  def rss(conn, params) do
    number = Map.get(params, :forums_count) || 10
    posts = Forum.list_topics(number)
    feed = build_feed(posts, conn)

    conn
    |> put_resp_content_type("text/xml")
    |> send_resp(200, feed)
  end

  def build_feed(posts, conn, path \\ :rss) do
    Feed.new(
      Routes.topics_path(conn, :index),
      DateTime.utc_now(),
      ApiWeb.Endpoint.host() <> " RSS"
    )
    |> Feed.author(ApiWeb.Endpoint.host(), email: "no-reply@" <> ApiWeb.Endpoint.host())
    |> Feed.link(Routes.topics_path(conn, path), rel: "self")
    |> Feed.entries(Enum.map(posts, &get_entry(conn, &1)))
    |> Feed.build()
    |> Atomex.generate_document()
  end

  defp get_entry(conn, %{title: name, slug: slug, description: summary, inserted_at: published_at}) do
    Entry.new(
      Routes.topics_url(conn, :show, slug),
      DateTime.from_naive!(published_at, "Etc/UTC"),
      name
    )
    |> Entry.link(Routes.topics_url(conn, :show, slug))
    |> Entry.author(ApiWeb.Endpoint.host())
    |> Entry.content(summary, type: "text")
    |> Entry.build()
  end
end
