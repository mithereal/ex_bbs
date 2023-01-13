defmodule ApiWeb.Plug.HitCounter do
  @behaviour Plug
  import Plug.Conn

  def init(opts), do: opts

  def call(conn, opts) do
    IO.inspect(conn, label: "conn")
    ## get the route
    ## pull out the controller/forum
    ## read ets
    page_counts = 0
    ## post to hit counter if not a bot or already visited
    Plug.Conn.assign(conn, :page_counts, page_counts)
  end
end
