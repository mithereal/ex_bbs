defmodule ApiWeb.Plug.LastVisit do
  @behaviour Plug
  import Plug.Conn

  def init(opts), do: opts

  def call(conn, _opts) do
    last_visit = []

    Plug.Conn.assign(conn, :last_visit, last_visit)
  end
end
