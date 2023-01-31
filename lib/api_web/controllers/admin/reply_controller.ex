defmodule postWeb.Admin.ReplyController do
  use postWeb, :controller

  alias post.Replies
  alias post.Replies.Queries

  def index(conn, params) do
    result = Queries.list_replies() |> Turbo.Ecto.turbo(params)
    render(conn, :index, replies: result.datas, paginate: result.paginate)
  end

  def show(conn, %{"id" => id}) do
    reply = Replies.get_reply!(id)
    render(conn, "show.html", reply: reply)
  end

  def delete(conn, %{"id" => id}) do
    reply = Replies.get_reply!(id)
    {:ok, _reply} = Replies.delete_reply(reply)

    conn
    |> put_flash(:info, "Reply deleted successfully.")
    |> redirect(to: admin_reply_path(conn, :index))
  end
end
