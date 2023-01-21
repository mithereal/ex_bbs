defmodule ApiWeb.Plug.Breadcrumbs do
  @behaviour Plug
  import Plug.Conn


  def init(opts), do: opts

  def call(conn, _opts) do

    Plug.Conn.assign(conn, :breadcrumbs, [])
  end
end
