defmodule Api.TopicCache do
  use Nebulex.Cache,
      otp_app: :api,
      adapter: Nebulex.Adapters.Local
end