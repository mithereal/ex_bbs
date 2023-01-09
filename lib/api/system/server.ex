defmodule Api.System.Setting.Server do
  use GenServer

  @moduledoc """
  Setting
    this will store the pointer to ets
  """

  require Logger

  def child_spec(args) do
    %{
      id: __MODULE__,
      start: {__MODULE__, :start_link, [args]},
      type: :worker
    }
  end

  @impl true
  def init(init_arg) do
#    ref =
#      :ets.new(:bbs_settings, [
#        :set,
#        :named_table,
#        :public,
#        read_concurrency: true,
#        write_concurrency: true
#      ])
#
#    :ets.insert(ref, {:default, init_arg})

    {:ok}
  end

  def start_link(arg) do
    GenServer.start_link(__MODULE__, arg)
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
  def handle_info({:DOWN, _ref, :process, _pid, _reason}, {names, refs}) do
    :ets.delete(names)
    {:noreply, {names, refs}}
  end
end
