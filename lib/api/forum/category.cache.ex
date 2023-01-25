defmodule Api.CategoryCache do
  use Nebulex.Cache,
      otp_app: :api,
      adapter: Nebulex.Adapters.Local
end