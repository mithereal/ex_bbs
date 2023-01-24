defmodule Api.TerminatorTest do
  use Api.DataCase

  alias Api.Terminator

  describe "performers" do
    alias Api.Terminator.Performer

    import Api.TerminatorFixtures

    @invalid_attrs %{abilities: nil, id: nil}

    test "list_performers/0 returns all performers" do
      performer = performer_fixture()
      assert Terminator.list_performers() == [performer]
    end

    test "get_performer!/1 returns the performer with given id" do
      performer = performer_fixture()
      assert Terminator.get_performer!(performer.id) == performer
    end

    test "create_performer/1 with valid data creates a performer" do
      valid_attrs = %{abilities: [], id: "7488a646-e31f-11e4-aace-600308960662"}

      assert {:ok, %Performer{} = performer} = Terminator.create_performer(valid_attrs)
      assert performer.abilities == []
      assert performer.id == "7488a646-e31f-11e4-aace-600308960662"
    end

    test "create_performer/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Terminator.create_performer(@invalid_attrs)
    end

    test "update_performer/2 with valid data updates the performer" do
      performer = performer_fixture()
      update_attrs = %{abilities: [], id: "7488a646-e31f-11e4-aace-600308960668"}

      assert {:ok, %Performer{} = performer} =
               Terminator.update_performer(performer, update_attrs)

      assert performer.abilities == []
      assert performer.id == "7488a646-e31f-11e4-aace-600308960668"
    end

    test "update_performer/2 with invalid data returns error changeset" do
      performer = performer_fixture()
      assert {:error, %Ecto.Changeset{}} = Terminator.update_performer(performer, @invalid_attrs)
      assert performer == Terminator.get_performer!(performer.id)
    end

    test "delete_performer/1 deletes the performer" do
      performer = performer_fixture()
      assert {:ok, %Performer{}} = Terminator.delete_performer(performer)
      assert_raise Ecto.NoResultsError, fn -> Terminator.get_performer!(performer.id) end
    end

    test "change_performer/1 returns a performer changeset" do
      performer = performer_fixture()
      assert %Ecto.Changeset{} = Terminator.change_performer(performer)
    end
  end

  describe "roles" do
    alias Api.Terminator.Role

    import Api.TerminatorFixtures

    @invalid_attrs %{abilities: nil, id: nil, identifier: nil, name: nil}

    test "list_roles/0 returns all roles" do
      role = role_fixture()
      assert Terminator.list_roles() == [role]
    end

    test "get_role!/1 returns the role with given id" do
      role = role_fixture()
      assert Terminator.get_role!(role.id) == role
    end

    test "create_role/1 with valid data creates a role" do
      valid_attrs = %{
        abilities: [],
        id: "7488a646-e31f-11e4-aace-600308960662",
        identifier: "some identifier",
        name: "some name"
      }

      assert {:ok, %Role{} = role} = Terminator.create_role(valid_attrs)
      assert role.abilities == []
      assert role.id == "7488a646-e31f-11e4-aace-600308960662"
      assert role.identifier == "some identifier"
      assert role.name == "some name"
    end

    test "create_role/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Terminator.create_role(@invalid_attrs)
    end

    test "update_role/2 with valid data updates the role" do
      role = role_fixture()

      update_attrs = %{
        abilities: [],
        id: "7488a646-e31f-11e4-aace-600308960668",
        identifier: "some updated identifier",
        name: "some updated name"
      }

      assert {:ok, %Role{} = role} = Terminator.update_role(role, update_attrs)
      assert role.abilities == []
      assert role.id == "7488a646-e31f-11e4-aace-600308960668"
      assert role.identifier == "some updated identifier"
      assert role.name == "some updated name"
    end

    test "update_role/2 with invalid data returns error changeset" do
      role = role_fixture()
      assert {:error, %Ecto.Changeset{}} = Terminator.update_role(role, @invalid_attrs)
      assert role == Terminator.get_role!(role.id)
    end

    test "delete_role/1 deletes the role" do
      role = role_fixture()
      assert {:ok, %Role{}} = Terminator.delete_role(role)
      assert_raise Ecto.NoResultsError, fn -> Terminator.get_role!(role.id) end
    end

    test "change_role/1 returns a role changeset" do
      role = role_fixture()
      assert %Ecto.Changeset{} = Terminator.change_role(role)
    end
  end

  describe "abilities" do
    alias Api.Terminator.Abilities

    import Api.TerminatorFixtures

    @invalid_attrs %{id: nil, identifier: nil, name: nil}

    test "list_abilities/0 returns all abilities" do
      abilities = abilities_fixture()
      assert Terminator.list_abilities() == [abilities]
    end

    test "get_abilities!/1 returns the abilities with given id" do
      abilities = abilities_fixture()
      assert Terminator.get_abilities!(abilities.id) == abilities
    end

    test "create_abilities/1 with valid data creates a abilities" do
      valid_attrs = %{
        id: "7488a646-e31f-11e4-aace-600308960662",
        identifier: "some identifier",
        name: "some name"
      }

      assert {:ok, %Abilities{} = abilities} = Terminator.create_abilities(valid_attrs)
      assert abilities.id == "7488a646-e31f-11e4-aace-600308960662"
      assert abilities.identifier == "some identifier"
      assert abilities.name == "some name"
    end

    test "create_abilities/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Terminator.create_abilities(@invalid_attrs)
    end

    test "update_abilities/2 with valid data updates the abilities" do
      abilities = abilities_fixture()

      update_attrs = %{
        id: "7488a646-e31f-11e4-aace-600308960668",
        identifier: "some updated identifier",
        name: "some updated name"
      }

      assert {:ok, %Abilities{} = abilities} =
               Terminator.update_abilities(abilities, update_attrs)

      assert abilities.id == "7488a646-e31f-11e4-aace-600308960668"
      assert abilities.identifier == "some updated identifier"
      assert abilities.name == "some updated name"
    end

    test "update_abilities/2 with invalid data returns error changeset" do
      abilities = abilities_fixture()
      assert {:error, %Ecto.Changeset{}} = Terminator.update_abilities(abilities, @invalid_attrs)
      assert abilities == Terminator.get_abilities!(abilities.id)
    end

    test "delete_abilities/1 deletes the abilities" do
      abilities = abilities_fixture()
      assert {:ok, %Abilities{}} = Terminator.delete_abilities(abilities)
      assert_raise Ecto.NoResultsError, fn -> Terminator.get_abilities!(abilities.id) end
    end

    test "change_abilities/1 returns a abilities changeset" do
      abilities = abilities_fixture()
      assert %Ecto.Changeset{} = Terminator.change_abilities(abilities)
    end
  end

  describe "entities" do
    alias Api.Terminator.Entities

    import Api.TerminatorFixtures

    @invalid_attrs %{abilities: nil, assoc_type: nil, id: nil}

    test "list_entities/0 returns all entities" do
      entities = entities_fixture()
      assert Terminator.list_entities() == [entities]
    end

    test "get_entities!/1 returns the entities with given id" do
      entities = entities_fixture()
      assert Terminator.get_entities!(entities.id) == entities
    end

    test "create_entities/1 with valid data creates a entities" do
      valid_attrs = %{
        abilities: "some abilities",
        assoc_type: "some assoc_type",
        id: "7488a646-e31f-11e4-aace-600308960662"
      }

      assert {:ok, %Entities{} = entities} = Terminator.create_entities(valid_attrs)
      assert entities.abilities == "some abilities"
      assert entities.assoc_type == "some assoc_type"
      assert entities.id == "7488a646-e31f-11e4-aace-600308960662"
    end

    test "create_entities/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Terminator.create_entities(@invalid_attrs)
    end

    test "update_entities/2 with valid data updates the entities" do
      entities = entities_fixture()

      update_attrs = %{
        abilities: "some updated abilities",
        assoc_type: "some updated assoc_type",
        id: "7488a646-e31f-11e4-aace-600308960668"
      }

      assert {:ok, %Entities{} = entities} = Terminator.update_entities(entities, update_attrs)
      assert entities.abilities == "some updated abilities"
      assert entities.assoc_type == "some updated assoc_type"
      assert entities.id == "7488a646-e31f-11e4-aace-600308960668"
    end

    test "update_entities/2 with invalid data returns error changeset" do
      entities = entities_fixture()
      assert {:error, %Ecto.Changeset{}} = Terminator.update_entities(entities, @invalid_attrs)
      assert entities == Terminator.get_entities!(entities.id)
    end

    test "delete_entities/1 deletes the entities" do
      entities = entities_fixture()
      assert {:ok, %Entities{}} = Terminator.delete_entities(entities)
      assert_raise Ecto.NoResultsError, fn -> Terminator.get_entities!(entities.id) end
    end

    test "change_entities/1 returns a entities changeset" do
      entities = entities_fixture()
      assert %Ecto.Changeset{} = Terminator.change_entities(entities)
    end
  end
end
