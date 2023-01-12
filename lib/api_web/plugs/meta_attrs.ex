defmodule ApiWeb.Plug.MetaAttrs do
  @behaviour Plug
  import Plug.Conn

  def init(opts), do: opts

  def call(conn, _opts) do
    meta_attrs = []

    Plug.Conn.assign(conn, :meta_attrs, meta_attrs)
  end
end
