defmodule postWeb.Admin.TopicController do
  use postWeb, :controller

  alias post.Topics.Queries

  def index(conn, params) do
    result = Queries.list_topics() |> Turbo.Ecto.turbo(params)
    render(conn, :index, topics: result.datas, paginate: result.paginate)
  end
end
