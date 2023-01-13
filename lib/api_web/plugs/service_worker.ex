defmodule ApiWeb.Plug.ServiceWorker do
  @behaviour Plug
  import Plug.Conn

  def init(opts), do: opts

  def call(conn, _opts) do

    Plug.Conn.assign(conn, :"Service-Worker-Allowed", "/js/")
  end
end
