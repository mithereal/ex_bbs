defmodule ApiWeb.CORS do
  endpoint = Application.get_env(:api, ApiWeb.Endpoint)
  origins = Keyword.get(endpoint, :origins) || "*"

  use Corsica.Router,
    origins: origins,
    allow_credentials: Application.get_env(:api, :allow_credentials, true),
    max_age: Application.get_env(:api, :max_age, 600)

  resource("/*")

  # We can override single settings as well.
  resource("/public/*", allow_credentials: false)
end
