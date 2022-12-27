defmodule Api.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  @impl true
  def start(_type, _args) do
    children = [
      # Start the PubSub system
      {Phoenix.PubSub, name: Api.PubSub}
      # Start a worker by calling: Api.Worker.start_link(arg)
      # {Api.Worker, arg}
    ]

    Supervisor.start_link(children, strategy: :one_for_one, name: Api.Supervisor)
  end
end
