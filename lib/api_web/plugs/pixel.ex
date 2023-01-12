defmodule ApiWeb.Plug.Pixel do
  @behaviour Plug
  import Plug.Conn

  def init(opts), do: opts

  def call(conn, _opts) do
    meta_pixel_id = Application.get_env(:api, :meta_pixel_id, "")

    Plug.Conn.assign(conn, :meta_pixel_id, meta_pixel_id)
  end
end
