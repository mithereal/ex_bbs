defmodule Api.MixProject do
  use Mix.Project

  def project do
    [
      app: :api,
      version: "1.0.0",
      elixir: "~> 1.12",
      elixirc_paths: elixirc_paths(Mix.env()),
      compilers: Mix.compilers(),
      start_permanent: Mix.env() == :prod,
      aliases: aliases(),
      deps: deps()
    ]
  end

  # Configuration for the OTP application.
  #
  # Type `mix help compile.app` for more information.
  def application do
    [
      mod: {Api.Application, []},
      extra_applications: [:logger, :runtime_tools]
    ]
  end

  # Specifies which paths to compile per environment.
  defp elixirc_paths(:test), do: ["lib", "test/support"]
  defp elixirc_paths(_), do: ["lib"]

  # Specifies your project dependencies.
  #
  # Type `mix help deps` for examples and options.
  defp deps do
    [
      {:bcrypt_elixir, "~> 2.0"},
      {:phoenix, "~> 1.6.11"},
      {:phoenix_ecto, "~> 4.4"},
      {:ecto_sql, "~> 3.6"},
      {:postgrex, ">= 0.0.0"},
      {:phoenix_html, "~> 3.2", override: true},
      {:phoenix_live_reload, "~> 1.2", only: :dev},
      {:phoenix_live_view, "~> 0.17", override: true},
      {:phoenix_live_dashboard, "~> 0.5"},
      {:esbuild, "~> 0.2", runtime: Mix.env() == :dev},
      {:tailwind, "~> 0.1.6", runtime: Mix.env() == :dev},
      {:dart_sass, "~> 0.5", runtime: Mix.env() == :dev},
      {:telemetry_metrics, "~> 0.6"},
      {:telemetry_poller, "~> 1.0"},
      {:gettext, "~> 0.18"},
      {:jason, "~> 1.2"},
      {:plug_cowboy, "~> 2.5"},
      {:tesla, "~> 1.4.0"},
      {:plug_attack, "~> 0.4.2"},
      {:plug_secex, "~> 0.2.0"},
      {:remote_ip, "~> 0.2.1"},
      {:corsica, "~> 1.1"},
      {:bypass, "~> 2.1"},
      {:inch_ex, ">= 0.0.0", only: :docs},
      {:exgravatar, ">= 0.0.0"},
      {:scrivener_ecto, "~> 2.0"},
      {:distillery, "~> 2.1"},
      {:credo, "~> 1.5.0", only: [:dev, :test], runtime: false},
      {:terminator_uuid, git: "https://github.com/mithereal/terminator_uuid.git"},
      {:open_api_spex, "~> 3.4"},
      {:unzip, "~> 0.7.1"},
      {:earmark, "~> 1.4.3"},
      {:decimal, "~> 2.0"},
      {:inflex, "~> 2.0.0"},
      {:sobelow, "~> 0.8", only: :dev},
      {:ecto_soft_delete, ">= 0.0.0"},
      {:webp, git: "https://github.com/mithereal/ex_webp.git"},
      {:faker, "~> 0.17.0", only: [:dev, :test], runtime: false},
      {:ueberauth, "~> 0.10.3", override: true},
      {:guardian, "~> 2.0"},
      {:guardian_db, "~> 2.0"},
      {:guardian_phoenix, "~> 2.0"},
      {:phoenix_copy, "~> 0.1.1"},
      {:dictionary, "~> 0.1.0"},
      {:swoosh, "~> 1.6"},
      {:gen_smtp, "~> 1.0"},
      {:phoenix_swoosh, "~> 1.0"},
      {:nanoid, "~> 2.0"},
      {:ice_cream, "~> 0.0.5", only: [:dev, :test]},
      {:premailex, "~> 0.3.16"},
      {:ecto_autoslug_field, "~> 3.0"},
      {:timex, "~> 3.7"},
      {:breadcrumble, "~> 1.0.0"},
      {:plug_content_security_policy,
       git: "https://github.com/data-twister/plug_content_security_policy.git"},
      {:atomex, "0.4.1"},
      {:nebulex, "~> 2.4"},
      # => When using :shards as backend
      {:shards, "~> 1.0"},
      # => When using Caching Annotations
      {:decorator, "~> 1.4"},
      # => When using the Telemetry events (Nebulex stats)
      {:telemetry, "~> 1.0"},
      {:x509, "~> 0.8"}
    ]
  end

  # Aliases are shortcuts or tasks specific to the current project.
  # For example, to install project dependencies and perform other setup tasks, run:
  #
  #     $ mix setup
  #
  # See the documentation for `Mix` for more info on aliases.
  defp aliases do
    [
      setup: ["deps.get", "ecto.setup", "cmd npm install --prefix assets", "assets.build"],
      "ecto.setup": [
        "ecto.create",
        "ecto.migrate",
        "run priv/repo/seeds.exs"
      ],
      "ecto.reset": ["ecto.drop", "ecto.setup"],
      test: ["ecto.create --quiet", "ecto.migrate --quiet", "test"],
      "assets.build": [
        "phx.copy default",
        "esbuild default",
        "sass default",
        "tailwind default",
        "sass user",
        "tailwind user",
        "sass admin",
        "tailwind admin"
      ],
      "assets.deploy": [
        "phx.copy default",
        "esbuild default --minify",
        "sass default",
        "tailwind default --minify",
        "sass user",
        "tailwind user --minify",
        "sass admin",
        "tailwind admin --minify",
        "phx.digest"
      ]
    ]
  end
end
