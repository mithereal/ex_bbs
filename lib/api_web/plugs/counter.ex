defmodule ApiWeb.Plug.HitCounter do
  @behaviour Plug
  import Plug.Conn

  def init(opts), do: opts

  def call(conn, _opts) do
    page_counts = 0

    Plug.Conn.assign(conn, :page_counts, page_counts)
  end
end
