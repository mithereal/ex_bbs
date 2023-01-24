defmodule Api.ForumTest do
  use Api.DataCase

  alias Api.Forum

  describe "forums" do
    alias Api.Forum.Forums

    import Api.ForumFixtures

    @invalid_attrs %{description: nil, id: nil, order: nil, status: nil, title: nil}

    test "list_forums/0 returns all forums" do
      forums = forums_fixture()
      assert Forum.list_forums() == [forums]
    end

    test "get_forums!/1 returns the forums with given id" do
      forums = forums_fixture()
      assert Forum.get_forums!(forums.id) == forums
    end

    test "create_forums/1 with valid data creates a forums" do
      valid_attrs = %{
        description: "some description",
        id: "7488a646-e31f-11e4-aace-600308960662",
        order: 42,
        status: 42,
        title: "some title"
      }

      assert {:ok, %Forums{} = forums} = Forum.create_forums(valid_attrs)
      assert forums.description == "some description"
      assert forums.id == "7488a646-e31f-11e4-aace-600308960662"
      assert forums.order == 42
      assert forums.status == 42
      assert forums.title == "some title"
    end

    test "create_forums/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Forum.create_forums(@invalid_attrs)
    end

    test "update_forums/2 with valid data updates the forums" do
      forums = forums_fixture()

      update_attrs = %{
        description: "some updated description",
        id: "7488a646-e31f-11e4-aace-600308960668",
        order: 43,
        status: 43,
        title: "some updated title"
      }

      assert {:ok, %Forums{} = forums} = Forum.update_forums(forums, update_attrs)
      assert forums.description == "some updated description"
      assert forums.id == "7488a646-e31f-11e4-aace-600308960668"
      assert forums.order == 43
      assert forums.status == 43
      assert forums.title == "some updated title"
    end

    test "update_forums/2 with invalid data returns error changeset" do
      forums = forums_fixture()
      assert {:error, %Ecto.Changeset{}} = Forum.update_forums(forums, @invalid_attrs)
      assert forums == Forum.get_forums!(forums.id)
    end

    test "delete_forums/1 deletes the forums" do
      forums = forums_fixture()
      assert {:ok, %Forums{}} = Forum.delete_forums(forums)
      assert_raise Ecto.NoResultsError, fn -> Forum.get_forums!(forums.id) end
    end

    test "change_forums/1 returns a forums changeset" do
      forums = forums_fixture()
      assert %Ecto.Changeset{} = Forum.change_forums(forums)
    end
  end

  describe "categories" do
    alias Api.Forum.Categories

    import Api.ForumFixtures

    @invalid_attrs %{description: nil, id: nil, order: nil, status: nil, title: nil}

    test "list_categories/0 returns all categories" do
      categories = categories_fixture()
      assert Forum.list_categories() == [categories]
    end

    test "get_categories!/1 returns the categories with given id" do
      categories = categories_fixture()
      assert Forum.get_categories!(categories.id) == categories
    end

    test "create_categories/1 with valid data creates a categories" do
      valid_attrs = %{
        description: "some description",
        id: "7488a646-e31f-11e4-aace-600308960662",
        order: 42,
        status: 42,
        title: "some title"
      }

      assert {:ok, %Categories{} = categories} = Forum.create_categories(valid_attrs)
      assert categories.description == "some description"
      assert categories.id == "7488a646-e31f-11e4-aace-600308960662"
      assert categories.order == 42
      assert categories.status == 42
      assert categories.title == "some title"
    end

    test "create_categories/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Forum.create_categories(@invalid_attrs)
    end

    test "update_categories/2 with valid data updates the categories" do
      categories = categories_fixture()

      update_attrs = %{
        description: "some updated description",
        id: "7488a646-e31f-11e4-aace-600308960668",
        order: 43,
        status: 43,
        title: "some updated title"
      }

      assert {:ok, %Categories{} = categories} = Forum.update_categories(categories, update_attrs)
      assert categories.description == "some updated description"
      assert categories.id == "7488a646-e31f-11e4-aace-600308960668"
      assert categories.order == 43
      assert categories.status == 43
      assert categories.title == "some updated title"
    end

    test "update_categories/2 with invalid data returns error changeset" do
      categories = categories_fixture()
      assert {:error, %Ecto.Changeset{}} = Forum.update_categories(categories, @invalid_attrs)
      assert categories == Forum.get_categories!(categories.id)
    end

    test "delete_categories/1 deletes the categories" do
      categories = categories_fixture()
      assert {:ok, %Categories{}} = Forum.delete_categories(categories)
      assert_raise Ecto.NoResultsError, fn -> Forum.get_categories!(categories.id) end
    end

    test "change_categories/1 returns a categories changeset" do
      categories = categories_fixture()
      assert %Ecto.Changeset{} = Forum.change_categories(categories)
    end
  end

  describe "topics" do
    alias Api.Forum.Topics

    import Api.ForumFixtures

    @invalid_attrs %{description: nil, id: nil, status: nil, title: nil}

    test "list_topics/0 returns all topics" do
      topics = topics_fixture()
      assert Forum.list_topics() == [topics]
    end

    test "get_topics!/1 returns the topics with given id" do
      topics = topics_fixture()
      assert Forum.get_topics!(topics.id) == topics
    end

    test "create_topics/1 with valid data creates a topics" do
      valid_attrs = %{
        description: "some description",
        id: "7488a646-e31f-11e4-aace-600308960662",
        status: 42,
        title: "some title"
      }

      assert {:ok, %Topics{} = topics} = Forum.create_topics(valid_attrs)
      assert topics.description == "some description"
      assert topics.id == "7488a646-e31f-11e4-aace-600308960662"
      assert topics.status == 42
      assert topics.title == "some title"
    end

    test "create_topics/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Forum.create_topics(@invalid_attrs)
    end

    test "update_topics/2 with valid data updates the topics" do
      topics = topics_fixture()

      update_attrs = %{
        description: "some updated description",
        id: "7488a646-e31f-11e4-aace-600308960668",
        status: 43,
        title: "some updated title"
      }

      assert {:ok, %Topics{} = topics} = Forum.update_topics(topics, update_attrs)
      assert topics.description == "some updated description"
      assert topics.id == "7488a646-e31f-11e4-aace-600308960668"
      assert topics.status == 43
      assert topics.title == "some updated title"
    end

    test "update_topics/2 with invalid data returns error changeset" do
      topics = topics_fixture()
      assert {:error, %Ecto.Changeset{}} = Forum.update_topics(topics, @invalid_attrs)
      assert topics == Forum.get_topics!(topics.id)
    end

    test "delete_topics/1 deletes the topics" do
      topics = topics_fixture()
      assert {:ok, %Topics{}} = Forum.delete_topics(topics)
      assert_raise Ecto.NoResultsError, fn -> Forum.get_topics!(topics.id) end
    end

    test "change_topics/1 returns a topics changeset" do
      topics = topics_fixture()
      assert %Ecto.Changeset{} = Forum.change_topics(topics)
    end
  end

  describe "posts" do
    alias Api.Forum.Posts

    import Api.ForumFixtures

    @invalid_attrs %{
      body: nil,
      description: nil,
      edit_count: nil,
      id: nil,
      status: nil,
      title: nil,
      username: nil
    }

    test "list_posts/0 returns all posts" do
      posts = posts_fixture()
      assert Forum.list_posts() == [posts]
    end

    test "get_posts!/1 returns the posts with given id" do
      posts = posts_fixture()
      assert Forum.get_posts!(posts.id) == posts
    end

    test "create_posts/1 with valid data creates a posts" do
      valid_attrs = %{
        body: "some body",
        description: "some description",
        edit_count: 42,
        id: "7488a646-e31f-11e4-aace-600308960662",
        status: 42,
        title: "some title",
        username: "some username"
      }

      assert {:ok, %Posts{} = posts} = Forum.create_posts(valid_attrs)
      assert posts.body == "some body"
      assert posts.description == "some description"
      assert posts.edit_count == 42
      assert posts.id == "7488a646-e31f-11e4-aace-600308960662"
      assert posts.status == 42
      assert posts.title == "some title"
      assert posts.username == "some username"
    end

    test "create_posts/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Forum.create_posts(@invalid_attrs)
    end

    test "update_posts/2 with valid data updates the posts" do
      posts = posts_fixture()

      update_attrs = %{
        body: "some updated body",
        description: "some updated description",
        edit_count: 43,
        id: "7488a646-e31f-11e4-aace-600308960668",
        status: 43,
        title: "some updated title",
        username: "some updated username"
      }

      assert {:ok, %Posts{} = posts} = Forum.update_posts(posts, update_attrs)
      assert posts.body == "some updated body"
      assert posts.description == "some updated description"
      assert posts.edit_count == 43
      assert posts.id == "7488a646-e31f-11e4-aace-600308960668"
      assert posts.status == 43
      assert posts.title == "some updated title"
      assert posts.username == "some updated username"
    end

    test "update_posts/2 with invalid data returns error changeset" do
      posts = posts_fixture()
      assert {:error, %Ecto.Changeset{}} = Forum.update_posts(posts, @invalid_attrs)
      assert posts == Forum.get_posts!(posts.id)
    end

    test "delete_posts/1 deletes the posts" do
      posts = posts_fixture()
      assert {:ok, %Posts{}} = Forum.delete_posts(posts)
      assert_raise Ecto.NoResultsError, fn -> Forum.get_posts!(posts.id) end
    end

    test "change_posts/1 returns a posts changeset" do
      posts = posts_fixture()
      assert %Ecto.Changeset{} = Forum.change_posts(posts)
    end
  end
end
