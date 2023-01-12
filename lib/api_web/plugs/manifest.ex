defmodule ApiWeb.Plug.Manifest do
  @behaviour Plug
  import Plug.Conn

  def init(opts), do: opts

  def call(conn, _opts) do
    manifest = 0

    Plug.Conn.assign(conn, :manifest, manifest)
  end
end
