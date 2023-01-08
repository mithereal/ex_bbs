defmodule Api.System.Setting.Server do
  use GenServer

  @moduledoc """
  Setting
    this will store the pointer to ets
  """

  require Logger

  @registry_name :instance

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

    :ets.insert(ref, {:default, init_arg})

    {:ok, %{type: init_arg.type, ref: ref}}
  end

  def start_link(arg) do
    name = via_tuple(arg.type)

    GenServer.start_link(__MODULE__, arg, name: name)
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

  @doc false
  def via_tuple(id, registry \\ @registry_name) do
    {:via, Registry, {registry, id}}
  end

  @impl true
  def handle_info({:DOWN, _ref, :process, _pid, _reason}, {names, refs}) do
    :ets.delete(names)
    {:noreply, {names, refs}}
  end

end
