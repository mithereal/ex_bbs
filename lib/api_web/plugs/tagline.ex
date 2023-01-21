defmodule ApiWeb.Plug.Tagline do
  @behaviour Plug
  import Plug.Conn


  def init(opts), do: opts

  def call(conn, _opts) do
    tagline = Application.get_env(:api, :site_tagline, "")

    Plug.Conn.assign(conn, :tagline, tagline)
  end
end
