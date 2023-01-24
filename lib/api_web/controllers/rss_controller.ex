defmodule ApiWeb.RssController do
  use ApiWeb, :controller

  alias Api.Forum, as: Posts
  alias Atomex.{Feed, Entry}


  def index(conn, params) do
    number = Map.get(params, :posts_count)
    posts = Posts.list_posts(number)
    feed = build_feed(posts, conn)

    conn
    |> put_resp_content_type("text/xml")
    |> send_resp(200, feed)
  end

  def build_feed(posts, conn) do
    Feed.new(Routes.posts_path(conn, :index), DateTime.utc_now,  ApiWeb.Endpoint.host() <> " RSS")
    |> Feed.author(ApiWeb.Endpoint.host(), email: "no-reply@" <> ApiWeb.Endpoint.host())
    |> Feed.link(Routes.rss_url(conn, :index), rel: "self")
    |> Feed.entries(Enum.map(posts, &get_entry(conn, &1)))
    |> Feed.build()
    |> Atomex.generate_document()
  end

  defp get_entry(conn, %{title: name, slug: slug, description: summary, inserted_at: published_at}) do
    Entry.new(Routes.posts_url(conn, :show, slug), DateTime.from_naive!(published_at, "Etc/UTC"), name)
    |> Entry.link(Routes.posts_url(conn, :show, slug))
    |> Entry.author(ApiWeb.Endpoint.host())
    |> Entry.content(summary, type: "text")
    |> Entry.build()
  end
end