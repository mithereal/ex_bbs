defmodule Api.System do
  @moduledoc """
  The System context.
  """

  import Ecto.Query, warn: false
  alias Api.Repo

  alias Api.System.Setting

  @default_abilities [
    "delete_account",
    "add_account",
    "edit_account",
    "ban_account",
    "add_attachment",
    "delete_attachment",
    "delete_user_group",
    "add_user_group",
    "edit_user_group",
    "edit_user_username",
    "edit_user_password",
    "edit_user_profile",
    "edit_user_email",
    "delete_user_pm",
    "add_user_pm",
    "edit_user_pm",
    "delete_forum",
    "add_forum",
    "edit_forum",
    "delete_topic",
    "add_topic",
    "edit_topic",
    "delete_post",
    "add_post",
    "edit_post",
    "approve_topic",
    "approve_forum",
    "approve_post",
    "maintenance"
  ]

  @user_abilities ["add_post"]

  @default_roles ["admin", "user"]

  @doc """
  Returns the list of settings.

  ## Examples

      iex> list_settings()
      [%Setting{}, ...]

  """
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
  def delete_setting(%Setting{} = setting) do
    Repo.delete(setting)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking setting changes.

  ## Examples

      iex> change_setting(setting)
      %Ecto.Changeset{data: %Setting{}}

  """
  def change_setting(%Setting{} = setting, attrs \\ %{}) do
    Setting.changeset(setting, attrs)
  end

  def default_roles() do
    roles = Application.get_env(:api, :default_roles, @default_roles)

    roles =
      Enum.map(roles, fn x ->
        Terminator.Role.build(x, [], "Site " <> String.capitalize(x))
        |> Terminator.Repo.insert()
      end)

    all_abilities = Api.Repo.all(Terminator.Ability)
    admin = Terminator.Repo.get_by(Terminator.Role, identifier: "admin")
    user = Terminator.Repo.get_by(Terminator.Role, identifier: "user")

    for ability <- all_abilities do
      Terminator.Role.grant(admin, ability)
    end

    for ability <- @user_abilities do
      ability = Terminator.Repo.get_by(Terminator.Ability, identifier: ability)
      Terminator.Role.grant(user, ability)
    end

    roles
  end

  def default_abilities() do
    abilities = Application.get_env(:api, :default_abilities, @default_abilities)

    Enum.map(abilities, fn x ->
      title =
        String.split(x, "_")
        |> Enum.map(fn x -> String.capitalize(x) end)
        |> Enum.join(" ")

      Terminator.Ability.build(x, title)
      |> Terminator.Repo.insert()
    end)
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

      iex> Stats.format_date(date)
  """
  def format_date(date) do
    {:ok, date_string} = Timex.format(date, "{ISOdate}")

    {:ok, h} = Timex.format(date, "{h24}")
    {:ok, m} = Timex.format(date, "{m}")
    {:ok, s} = Timex.format(date, "{s}")

    sf_date_string = date_string <> "T" <> h <> ":" <> m <> ":" <> s <> "z"
  end
end
