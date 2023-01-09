defmodule Api.System.Setting.Server do
  use GenServer

  @moduledoc """
  Setting
    this will store the pointer to ets
  """

  require Logger

  @name :settings_server

  def child_spec(args) do
    %{
      id: __MODULE__,
      start: {__MODULE__, :start_link, [args]},
      type: :worker
    }
  end

  @impl true
  def init(init_arg) do
    ref =
      :ets.new(:bbs_settings, [
        :set,
        :named_table,
        :public,
        read_concurrency: true,
        write_concurrency: true
      ])

    {:ok, ref}
  end

  def start_link(arg) do
    GenServer.start_link(__MODULE__, arg,  name: @name)
  end

  def shutdown() do
    GenServer.call(__MODULE__, :shutdown)
  end

  @impl true
  def handle_call(
        :shutdown,
        _from,
        state
      ) do
    {:stop, {:ok, "Normal Shutdown"}, state}
  end

  @impl true
  def handle_cast(
        :shutdown,
        state
      ) do
    {:stop, :normal, state}
  end

  @impl true
  def handle_cast(
        :load,
        state
      ) do
    defaults = Api.Repo.all(Api.System.Setting)

    for d <- defaults do
      :ets.insert(state, {d.key, d})
    end

    {:noreply, state}
  end

  @impl true
  def handle_info({:DOWN, _ref, :process, _pid, _reason}, {names, refs}) do
    :ets.delete(names)
    {:noreply, {names, refs}}
  end

  def load(pid \\ @name) do
    GenServer.cast(pid, :load)
  end
end
