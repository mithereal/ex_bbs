defmodule Api.System do
  @moduledoc """
  The System context.
  """
  use Nebulex.Caching
  import Ecto.Query, warn: false
  alias Api.Repo

  alias Api.System.Setting
  alias Api.SettingCache

  @ttl :timer.hours(1)

  @doc """
  Returns the list of settings.

  ## Examples

      iex> list_settings()
      [%Setting{}, ...]

  """
  @decorate cacheable(cache: SettingCache)
  def list_settings do
    Repo.all(Setting)
  end

  @doc """
  Gets a single setting.

  Raises `Ecto.NoResultsError` if the Setting does not exist.

  ## Examples

      iex> get_setting!(123)
      %Setting{}

      iex> get_setting!(456)
      ** (Ecto.NoResultsError)

  """
  def get_setting!(id), do: Repo.get!(Setting, id)

  @decorate cacheable(cache: SettingCache, key: {Setting, title}, opts: [ttl: @ttl])
  def get_setting(title), do: Repo.get_by(Setting, title: title)

  @doc """
  Creates a setting.

  ## Examples

      iex> create_setting(%{field: value})
      {:ok, %Setting{}}

      iex> create_setting(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_setting(attrs \\ %{}) do
    %Setting{}
    |> Setting.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a setting.

  ## Examples

      iex> update_setting(setting, %{field: new_value})
      {:ok, %Setting{}}

      iex> update_setting(setting, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  @decorate cache_put(
              cache: SettingCache,
              key: {Setting, setting.title},
              match: &match_update/1,
              opts: [ttl: @ttl]
            )
  def update_setting(%Setting{} = setting, attrs) do
    setting
    |> Setting.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a setting.

  ## Examples

      iex> delete_setting(setting)
      {:ok, %Setting{}}

      iex> delete_setting(setting)
      {:error, %Ecto.Changeset{}}

  """
  @decorate cache_evict(cache: SettingCache, key: {Setting, setting.title})
  def delete_setting(%Setting{} = setting) do
    Repo.delete(setting)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking setting changes.

  ## Examples

      iex> change_setting(setting)
      %Ecto.Changeset{data: %Setting{}}

  """
  @decorate cache_put(cache: Cache, key: {Setting, setting.title}, opts: [ttl: @ttl])
  def change_setting(%Setting{} = setting, attrs \\ %{}) do
    Setting.changeset(setting, attrs)
  end

  def to_type(data) when data.type == "integer" do
    String.to_integer(data.value)
  end

  def to_type(data) when data.type == "float" do
    String.to_float(data.value)
  end

  def to_type(data) do
    data.value
  end

  def to_type(data) when data.type == "boolean" do
    if data.value == "true" || "TRUE" do
      true
    else
      false
    end
  end

  @doc """
  Format Date.
    This will take a native DateTime and turn it into a js datetime
  ## Examples

      iex> System.format_date(date)
  """
  def format_date(date) do
    {:ok, date_string} = Timex.format(date, "{ISOdate}")

    {:ok, h} = Timex.format(date, "{h24}")
    {:ok, m} = Timex.format(date, "{m}")
    {:ok, s} = Timex.format(date, "{s}")

    date_string <> "T" <> h <> ":" <> m <> ":" <> s <> "z"
  end

  def format_time(date) do
    {:ok, date_string} = Timex.format(date, "{ISOdate}")

    {:ok, h} = Timex.format(date, "{h24}")
    {:ok, m} = Timex.format(date, "{m}")
    {:ok, t} = Timex.format(date, "{AM}")
    {:ok, z} = Timex.format(date, "{Zabbr}")

    h <> ":" <> m <> " " <> t <> " (" <> z <> ")"
  end

  defp match_update({:ok, value}), do: {true, value}
  defp match_update({:error, _}), do: false
end
