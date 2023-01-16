defmodule Api.Terminator do
  @moduledoc """
  The Terminator context.
  """

  import Ecto.Query, warn: false
  alias Api.Repo

  alias Api.Terminator.Performer

  @doc """
  Returns the list of performers.

  ## Examples

      iex> list_performers()
      [%Performer{}, ...]

  """
  def list_performers do
    Repo.all(Performer)
  end

  @doc """
  Gets a single performer.

  Raises `Ecto.NoResultsError` if the Performer does not exist.

  ## Examples

      iex> get_performer!(123)
      %Performer{}

      iex> get_performer!(456)
      ** (Ecto.NoResultsError)

  """
  def get_performer!(id), do: Repo.get!(Performer, id)

  @doc """
  Creates a performer.

  ## Examples

      iex> create_performer(%{field: value})
      {:ok, %Performer{}}

      iex> create_performer(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_performer(attrs \\ %{}) do
    %Performer{}
    |> Performer.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a performer.

  ## Examples

      iex> update_performer(performer, %{field: new_value})
      {:ok, %Performer{}}

      iex> update_performer(performer, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_performer(%Performer{} = performer, attrs) do
    performer
    |> Performer.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a performer.

  ## Examples

      iex> delete_performer(performer)
      {:ok, %Performer{}}

      iex> delete_performer(performer)
      {:error, %Ecto.Changeset{}}

  """
  def delete_performer(%Performer{} = performer) do
    Repo.delete(performer)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking performer changes.

  ## Examples

      iex> change_performer(performer)
      %Ecto.Changeset{data: %Performer{}}

  """
  def change_performer(%Performer{} = performer, attrs \\ %{}) do
    Performer.changeset(performer, attrs)
  end

  alias Api.Terminator.Role

  @doc """
  Returns the list of roles.

  ## Examples

      iex> list_roles()
      [%Role{}, ...]

  """
  def list_roles do
    Repo.all(Role)
  end

  @doc """
  Gets a single role.

  Raises `Ecto.NoResultsError` if the Role does not exist.

  ## Examples

      iex> get_role!(123)
      %Role{}

      iex> get_role!(456)
      ** (Ecto.NoResultsError)

  """
  def get_role!(id), do: Repo.get!(Role, id)

  @doc """
  Creates a role.

  ## Examples

      iex> create_role(%{field: value})
      {:ok, %Role{}}

      iex> create_role(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_role(attrs \\ %{}) do
    %Role{}
    |> Role.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a role.

  ## Examples

      iex> update_role(role, %{field: new_value})
      {:ok, %Role{}}

      iex> update_role(role, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_role(%Role{} = role, attrs) do
    role
    |> Role.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a role.

  ## Examples

      iex> delete_role(role)
      {:ok, %Role{}}

      iex> delete_role(role)
      {:error, %Ecto.Changeset{}}

  """
  def delete_role(%Role{} = role) do
    Repo.delete(role)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking role changes.

  ## Examples

      iex> change_role(role)
      %Ecto.Changeset{data: %Role{}}

  """
  def change_role(%Role{} = role, attrs \\ %{}) do
    Role.changeset(role, attrs)
  end

  alias Api.Terminator.Abilities

  @doc """
  Returns the list of abilities.

  ## Examples

      iex> list_abilities()
      [%Abilities{}, ...]

  """
  def list_abilities do
    Repo.all(Abilities)
  end

  @doc """
  Gets a single abilities.

  Raises `Ecto.NoResultsError` if the Abilities does not exist.

  ## Examples

      iex> get_abilities!(123)
      %Abilities{}

      iex> get_abilities!(456)
      ** (Ecto.NoResultsError)

  """
  def get_abilities!(id), do: Repo.get!(Abilities, id)

  @doc """
  Creates a abilities.

  ## Examples

      iex> create_abilities(%{field: value})
      {:ok, %Abilities{}}

      iex> create_abilities(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_abilities(attrs \\ %{}) do
    %Abilities{}
    |> Abilities.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a abilities.

  ## Examples

      iex> update_abilities(abilities, %{field: new_value})
      {:ok, %Abilities{}}

      iex> update_abilities(abilities, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_abilities(%Abilities{} = abilities, attrs) do
    abilities
    |> Abilities.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a abilities.

  ## Examples

      iex> delete_abilities(abilities)
      {:ok, %Abilities{}}

      iex> delete_abilities(abilities)
      {:error, %Ecto.Changeset{}}

  """
  def delete_abilities(%Abilities{} = abilities) do
    Repo.delete(abilities)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking abilities changes.

  ## Examples

      iex> change_abilities(abilities)
      %Ecto.Changeset{data: %Abilities{}}

  """
  def change_abilities(%Abilities{} = abilities, attrs \\ %{}) do
    Abilities.changeset(abilities, attrs)
  end

  alias Api.Terminator.Entities

  @doc """
  Returns the list of entities.

  ## Examples

      iex> list_entities()
      [%Entities{}, ...]

  """
  def list_entities do
    Repo.all(Entities)
  end

  @doc """
  Gets a single entities.

  Raises `Ecto.NoResultsError` if the Entities does not exist.

  ## Examples

      iex> get_entities!(123)
      %Entities{}

      iex> get_entities!(456)
      ** (Ecto.NoResultsError)

  """
  def get_entities!(id), do: Repo.get!(Entities, id)

  @doc """
  Creates a entities.

  ## Examples

      iex> create_entities(%{field: value})
      {:ok, %Entities{}}

      iex> create_entities(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_entities(attrs \\ %{}) do
    %Entities{}
    |> Entities.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a entities.

  ## Examples

      iex> update_entities(entities, %{field: new_value})
      {:ok, %Entities{}}

      iex> update_entities(entities, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_entities(%Entities{} = entities, attrs) do
    entities
    |> Entities.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a entities.

  ## Examples

      iex> delete_entities(entities)
      {:ok, %Entities{}}

      iex> delete_entities(entities)
      {:error, %Ecto.Changeset{}}

  """
  def delete_entities(%Entities{} = entities) do
    Repo.delete(entities)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking entities changes.

  ## Examples

      iex> change_entities(entities)
      %Ecto.Changeset{data: %Entities{}}

  """
  def change_entities(%Entities{} = entities, attrs \\ %{}) do
    Entities.changeset(entities, attrs)
  end
end
