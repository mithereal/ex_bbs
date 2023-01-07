import Config

# Only in tests, remove the complexity from the password hashing algorithm
config :bcrypt_elixir, :log_rounds, 1
# Configure your database
#
# The MIX_TEST_PARTITION environment variable can be used
# to provide built-in test partitioning in CI environment.
# Run `mix help test` for more information.
config :api, Api.Repo,
  username: "postgres",
  password: "postgres",
  database: "exbbs#{System.get_env("MIX_TEST_PARTITION")}",
  hostname: "localhost",
  port: 55_432,
  pool: Ecto.Adapters.SQL.Sandbox

config :terminator, Terminator.Repo,
  username: "postgres",
  password: "postgres",
  database: "exbbs#{System.get_env("MIX_TEST_PARTITION")}",
  hostname: "localhost",
  port: 55_432,
  pool: Ecto.Adapters.SQL.Sandbox

# We don't run a server during test. If one is required,
# you can enable the server option below.
config :api, ApiWeb.Endpoint,
  http: [port: 4002],
  server: false

# Print only warnings and errors during test
config :logger, level: :warn
