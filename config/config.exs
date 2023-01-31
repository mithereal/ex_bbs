# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.

# General application configuration
import Config

config :api, :generators, context_app: :api

signing_salt = "4532fds242"
session_key = "fsdfsdce54"
secret_key_base = "4rIGvcjT1Li5zkXo0ZIEjoaSKzDfhCiMVKvgOjinBRT2J1wJxUkNsCGlZd0PfD8+"
hostname = "localhost"

config :api,
  ecto_repos: [Api.Repo],
  google_play_id: "",
  meta_pixel_id: ""

# Configures the endpoint
config :api, ApiWeb.Endpoint,
  url: [host: hostname],
  secret_key_base: secret_key_base,
  render_errors: [view: ApiWeb.ErrorView, accepts: ~w(html json), layout: false],
  pubsub_server: Api.PubSub,
  live_view: [signing_salt: signing_salt],
  session_signing_salt: signing_salt,
  session_key: session_key,
  session_store: :cookie,
  origins: "*",
  allow_credentials: true,
  max_age: 600

config :tesla, adapter: Tesla.Adapter.Hackney

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason


# Sentry
config :sentry,
       dsn: System.get_env("SENRTY_DSN"),
       included_environments: [:prod],
       environment_name: Mix.env(),
       enable_source_code_context: true,
       root_source_code_path: File.cwd!()

config :turbo_ecto, Turbo.Ecto,
       repo: Api.Repo

config :gettext, :default_locale, "en"

config :phoenix,
  static_compressors: [Webp.Compressor]

config :api, Api.ForumCache,
       backend: :shards,
       gc_interval: :timer.hours(12),
       max_size: 1_000_000,
       allocated_memory: 2_000_000_000,
       gc_cleanup_min_timeout: :timer.seconds(10),
       gc_cleanup_max_timeout: :timer.minutes(10)

config :dart_sass,
  version: "1.49.11",
  default: [
    args: ~w(css/root.scss css/root.css.tailwind),
    cd: Path.expand("../assets", __DIR__)
  ],
  user: [
    args: ~w(css/user.scss css/user.css.tailwind),
    cd: Path.expand("../assets", __DIR__)
  ],
  admin: [
    args: ~w(css/admin.scss css/admin.css.tailwind),
    cd: Path.expand("../assets", __DIR__)
  ]

config :esbuild,
  version: "0.12.18",
  default: [
    args:
      ~w(js/root.js --bundle --target=es2017 --outdir=../priv/static/js --external:/fonts/* --external:/images/*),
    cd: Path.expand("../assets", __DIR__),
    env: %{"NODE_PATH" => Path.expand("../deps", __DIR__)}
  ],
  user: [
    args:
      ~w(js/user.js --bundle --target=es2017 --outdir=../priv/static/js --external:/fonts/* --external:/images/*),
    cd: Path.expand("../assets", __DIR__),
    env: %{"NODE_PATH" => Path.expand("../deps", __DIR__)}
  ],
  admin: [
    args:
      ~w(js/admin.js --bundle --target=es2017 --outdir=../priv/static/js --external:/fonts/* --external:/images/*),
    cd: Path.expand("../assets", __DIR__),
    env: %{"NODE_PATH" => Path.expand("../deps", __DIR__)}
  ]

config :tailwind,
  version: "3.1.6",
  default: [
    args: ~w(
      --config=tailwind.config.js
      --input=css/root.css.tailwind
      --output=../priv/static/css/root.css
    ),
    cd: Path.expand("../assets", __DIR__)
  ],
  user: [
    args: ~w(
      --config=tailwind.config.js
      --input=css/user.css.tailwind
      --output=../priv/static/css/user.css
    ),
    cd: Path.expand("../assets", __DIR__)
  ],
  admin: [
    args: ~w(
      --config=tailwind.config.js
      --input=css/admin.css.tailwind
      --output=../priv/static/css/admin.css
    ),
    cd: Path.expand("../assets", __DIR__)
  ]

config :phoenix_copy,
  default: [
    source: Path.expand("../assets/static/", __DIR__),
    destination: Path.expand("../priv/static/", __DIR__)
  ]

config :webp,
  image_extensions: [".png", ".jpg", ".jpeg"],
  path: "/usr/bin/cwebp",
  location: Path.expand("../assets/static/images", __DIR__),
  destination: Path.expand("../assets/static/images", __DIR__),
  default: [
    location: Path.expand("../assets/static/images", __DIR__),
    destination: Path.expand("../assets/static/images", __DIR__)
  ]

config :ueberauth, Ueberauth, providers: []

config :swoosh, :api_client, false

config :api, Api.Mailer,
  adapter: Swoosh.Adapters.SMTP,
  relay: "",
  username: "",
  password: "",
  ssl: false,
  tls: :always,
  auth: :always,
  port: 1025,
  retries: 2,
  no_mx_lookups: false

config :plug_content_security_policy,
  nonces_for: [],
  report_only: false,
  directives: %{
    default_src: ~w('self' 'unsafe-eval' 'unsafe-inline'),
    connect_src: ~w('self'),
    child_src: ~w('self'),
    img_src: ~w('self'),
    script_src: ~w('self' * 'unsafe-eval' 'unsafe-inline'),
    style_src: ~w('self' 'unsafe-eval' 'unsafe-inline')
  }

config :request_cache_plug,
       enabled?: true,
       verbose?: false,
       graphql_paths: [],
       conn_priv_key: :__shared_request_cache__,
       request_cache_module: RequestCache.ConCacheStore,
       default_ttl: :timer.hours(1),
       default_concache_opts: [
         ttl_check_interval: :timer.seconds(1),
         acquire_lock_timeout: :timer.seconds(1),
         ets_options: [write_concurrency: true, read_concurrency: true]
       ]

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"
