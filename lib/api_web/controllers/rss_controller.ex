defmodule ApiWeb.RssController do
  use ApiWeb, :controller

  alias Api.Forum, as: Posts
  alias Atomex.{Feed, Entry}

  @author "mithereal"
  @email "mithereal@gmail.com"

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
    |> Feed.author(@author, email: @email)
    |> Feed.link(Routes.rss_url(conn, :index), rel: "self")
    |> Feed.entries(Enum.map(posts, &get_entry(conn, &1)))
    |> Feed.build()
    |> Atomex.generate_document()
  end

  defp get_entry(conn, %{name: name, kind: kind, slug: slug, summary: summary, published_at: published_at}) do
    Entry.new(Routes.post_url(conn, :show, kind, slug), DateTime.from_naive!(published_at, "Etc/UTC"), name)
    |> Entry.link(Routes.post_url(conn, :show, kind, slug))
    |> Entry.author(@author)
    |> Entry.content(summary, type: "text")
    |> Entry.build()
  end
end