defmodule Api.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  def start(_type, _args) do
    children = [
      # Start the Ecto repository
      Api.Repo,
      # Start the Telemetry supervisor
      ApiWeb.Telemetry,
      # Start the PubSub system
      {Phoenix.PubSub, name: Api.PubSub},
      # Start the Endpoint (http/https)
      ApiWeb.Endpoint,
      # Start user Registry
      {Registry, keys: :unique, name: :user_registry},
      # Start the User supervisor
      Api.User.Server.Supervisor,
      Api.Error.Server.Supervisor,
      {Api.ForumCache, []},
      {Api.TopicCache, []},
      {Api.PostCache, []},
      {Api.CategoryCache, []},
      {Api.SettingCache, []},
      # Start user Registry
      {DynamicSupervisor, strategy: :one_for_one, name: :server_supervisor}
    ]

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: Api.Supervisor]

    Supervisor.start_link(children, opts)
    |> setup_abilities()
    |> setup_role_tables()
    |> create_default_settings()
    |> create_default_users()
    |> load_settings()
  end

  def setup_abilities(response) do
    Api.System.default_abilities()

    response
  end

  def setup_role_tables(response) do
    Api.System.default_roles()

    response
  end

  def create_default_users(response) do
    url = Application.get_env(:api, ApiWeb.Endpoint)
    [{_, hostname}, {_, _port}] = Keyword.get(url, :url)

    repo = Application.get_env(:api, Api.Repo)

    default_username = Keyword.get(repo, :default_admin_username) || "admin"
    default_password = Keyword.get(repo, :default_admin_password) || "exbbs"

    Api.Accounts.register_admin(%{
      email: default_username <> "@" <> hostname,
      password: default_password,
      password_confirmation: default_password,
      username: default_username
    })

    response
  end

  def create_default_settings(response) do
    Api.System.Setting.defaults()
    |> Enum.map(fn x ->
      Api.System.create_setting(x)
    end)

    response
  end


  def load_settings(response) do

    response
  end


  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  def config_change(changed, _new, removed) do
    ApiWeb.Endpoint.config_change(changed, removed)
    :ok
  end

  @version Mix.Project.config()[:version]

  def version, do: @version
end
