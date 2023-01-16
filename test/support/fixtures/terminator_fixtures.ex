defmodule Api.TerminatorFixtures do
  @moduledoc """
  This module defines test helpers for creating
  entities via the `Api.Terminator` context.
  """

  @doc """
  Generate a performer.
  """
  def performer_fixture(attrs \\ %{}) do
    {:ok, performer} =
      attrs
      |> Enum.into(%{
        abilities: [],
        id: "7488a646-e31f-11e4-aace-600308960662"
      })
      |> Api.Terminator.create_performer()

    performer
  end

  @doc """
  Generate a role.
  """
  def role_fixture(attrs \\ %{}) do
    {:ok, role} =
      attrs
      |> Enum.into(%{
        abilities: [],
        id: "7488a646-e31f-11e4-aace-600308960662",
        identifier: "some identifier",
        name: "some name"
      })
      |> Api.Terminator.create_role()

    role
  end

  @doc """
  Generate a abilities.
  """
  def abilities_fixture(attrs \\ %{}) do
    {:ok, abilities} =
      attrs
      |> Enum.into(%{
        id: "7488a646-e31f-11e4-aace-600308960662",
        identifier: "some identifier",
        name: "some name"
      })
      |> Api.Terminator.create_abilities()

    abilities
  end

  @doc """
  Generate a entities.
  """
  def entities_fixture(attrs \\ %{}) do
    {:ok, entities} =
      attrs
      |> Enum.into(%{
        abilities: "some abilities",
        assoc_type: "some assoc_type",
        id: "7488a646-e31f-11e4-aace-600308960662"
      })
      |> Api.Terminator.create_entities()

    entities
  end
end
