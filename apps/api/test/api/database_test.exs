defmodule Api.DatabaseTest do
  use Api.DataCase

  alias Api.Database

  describe "categories" do
    alias Api.Database.Category

    import Api.DatabaseFixtures

    @invalid_attrs %{cat_id: nil, cat_order: nil, cat_title: nil}

    test "list_categories/0 returns all categories" do
      category = category_fixture()
      assert Database.list_categories() == [category]
    end

    test "get_category!/1 returns the category with given id" do
      category = category_fixture()
      assert Database.get_category!(category.id) == category
    end

    test "create_category/1 with valid data creates a category" do
      valid_attrs = %{cat_id: 42, cat_order: 42, cat_title: "some cat_title"}

      assert {:ok, %Category{} = category} = Database.create_category(valid_attrs)
      assert category.cat_id == 42
      assert category.cat_order == 42
      assert category.cat_title == "some cat_title"
    end

    test "create_category/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Database.create_category(@invalid_attrs)
    end

    test "update_category/2 with valid data updates the category" do
      category = category_fixture()
      update_attrs = %{cat_id: 43, cat_order: 43, cat_title: "some updated cat_title"}

      assert {:ok, %Category{} = category} = Database.update_category(category, update_attrs)
      assert category.cat_id == 43
      assert category.cat_order == 43
      assert category.cat_title == "some updated cat_title"
    end

    test "update_category/2 with invalid data returns error changeset" do
      category = category_fixture()
      assert {:error, %Ecto.Changeset{}} = Database.update_category(category, @invalid_attrs)
      assert category == Database.get_category!(category.id)
    end

    test "delete_category/1 deletes the category" do
      category = category_fixture()
      assert {:ok, %Category{}} = Database.delete_category(category)
      assert_raise Ecto.NoResultsError, fn -> Database.get_category!(category.id) end
    end

    test "change_category/1 returns a category changeset" do
      category = category_fixture()
      assert %Ecto.Changeset{} = Database.change_category(category)
    end
  end

  describe "banlist" do
    alias Api.Database.Banlist

    import Api.DatabaseFixtures

    @invalid_attrs %{group_description: nil, group_id: nil, group_moderator: nil, group_name: nil, group_single_user: nil, group_type: nil}

    test "list_banlist/0 returns all banlist" do
      banlist = banlist_fixture()
      assert Database.list_banlist() == [banlist]
    end

    test "get_banlist!/1 returns the banlist with given id" do
      banlist = banlist_fixture()
      assert Database.get_banlist!(banlist.id) == banlist
    end

    test "create_banlist/1 with valid data creates a banlist" do
      valid_attrs = %{group_description: "some group_description", group_id: 42, group_moderator: 42, group_name: "some group_name", group_single_user: 42, group_type: 42}

      assert {:ok, %Banlist{} = banlist} = Database.create_banlist(valid_attrs)
      assert banlist.group_description == "some group_description"
      assert banlist.group_id == 42
      assert banlist.group_moderator == 42
      assert banlist.group_name == "some group_name"
      assert banlist.group_single_user == 42
      assert banlist.group_type == 42
    end

    test "create_banlist/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Database.create_banlist(@invalid_attrs)
    end

    test "update_banlist/2 with valid data updates the banlist" do
      banlist = banlist_fixture()
      update_attrs = %{group_description: "some updated group_description", group_id: 43, group_moderator: 43, group_name: "some updated group_name", group_single_user: 43, group_type: 43}

      assert {:ok, %Banlist{} = banlist} = Database.update_banlist(banlist, update_attrs)
      assert banlist.group_description == "some updated group_description"
      assert banlist.group_id == 43
      assert banlist.group_moderator == 43
      assert banlist.group_name == "some updated group_name"
      assert banlist.group_single_user == 43
      assert banlist.group_type == 43
    end

    test "update_banlist/2 with invalid data returns error changeset" do
      banlist = banlist_fixture()
      assert {:error, %Ecto.Changeset{}} = Database.update_banlist(banlist, @invalid_attrs)
      assert banlist == Database.get_banlist!(banlist.id)
    end

    test "delete_banlist/1 deletes the banlist" do
      banlist = banlist_fixture()
      assert {:ok, %Banlist{}} = Database.delete_banlist(banlist)
      assert_raise Ecto.NoResultsError, fn -> Database.get_banlist!(banlist.id) end
    end

    test "change_banlist/1 returns a banlist changeset" do
      banlist = banlist_fixture()
      assert %Ecto.Changeset{} = Database.change_banlist(banlist)
    end
  end

  describe "groups" do
    alias Api.Database.Group

    import Api.DatabaseFixtures

    @invalid_attrs %{group_description: nil, group_id: nil, group_moderator: nil, group_name: nil, group_single_user: nil, group_type: nil}

    test "list_groups/0 returns all groups" do
      group = group_fixture()
      assert Database.list_groups() == [group]
    end

    test "get_group!/1 returns the group with given id" do
      group = group_fixture()
      assert Database.get_group!(group.id) == group
    end

    test "create_group/1 with valid data creates a group" do
      valid_attrs = %{group_description: "some group_description", group_id: 42, group_moderator: 42, group_name: "some group_name", group_single_user: 42, group_type: 42}

      assert {:ok, %Group{} = group} = Database.create_group(valid_attrs)
      assert group.group_description == "some group_description"
      assert group.group_id == 42
      assert group.group_moderator == 42
      assert group.group_name == "some group_name"
      assert group.group_single_user == 42
      assert group.group_type == 42
    end

    test "create_group/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Database.create_group(@invalid_attrs)
    end

    test "update_group/2 with valid data updates the group" do
      group = group_fixture()
      update_attrs = %{group_description: "some updated group_description", group_id: 43, group_moderator: 43, group_name: "some updated group_name", group_single_user: 43, group_type: 43}

      assert {:ok, %Group{} = group} = Database.update_group(group, update_attrs)
      assert group.group_description == "some updated group_description"
      assert group.group_id == 43
      assert group.group_moderator == 43
      assert group.group_name == "some updated group_name"
      assert group.group_single_user == 43
      assert group.group_type == 43
    end

    test "update_group/2 with invalid data returns error changeset" do
      group = group_fixture()
      assert {:error, %Ecto.Changeset{}} = Database.update_group(group, @invalid_attrs)
      assert group == Database.get_group!(group.id)
    end

    test "delete_group/1 deletes the group" do
      group = group_fixture()
      assert {:ok, %Group{}} = Database.delete_group(group)
      assert_raise Ecto.NoResultsError, fn -> Database.get_group!(group.id) end
    end

    test "change_group/1 returns a group changeset" do
      group = group_fixture()
      assert %Ecto.Changeset{} = Database.change_group(group)
    end
  end

  describe "confirm" do
    alias Api.Database.Confirm

    import Api.DatabaseFixtures

    @invalid_attrs %{code: nil, confirm_id: nil, session_id: nil}

    test "list_confirm/0 returns all confirm" do
      confirm = confirm_fixture()
      assert Database.list_confirm() == [confirm]
    end

    test "get_confirm!/1 returns the confirm with given id" do
      confirm = confirm_fixture()
      assert Database.get_confirm!(confirm.id) == confirm
    end

    test "create_confirm/1 with valid data creates a confirm" do
      valid_attrs = %{code: 42, confirm_id: 42, session_id: 42}

      assert {:ok, %Confirm{} = confirm} = Database.create_confirm(valid_attrs)
      assert confirm.code == 42
      assert confirm.confirm_id == 42
      assert confirm.session_id == 42
    end

    test "create_confirm/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Database.create_confirm(@invalid_attrs)
    end

    test "update_confirm/2 with valid data updates the confirm" do
      confirm = confirm_fixture()
      update_attrs = %{code: 43, confirm_id: 43, session_id: 43}

      assert {:ok, %Confirm{} = confirm} = Database.update_confirm(confirm, update_attrs)
      assert confirm.code == 43
      assert confirm.confirm_id == 43
      assert confirm.session_id == 43
    end

    test "update_confirm/2 with invalid data returns error changeset" do
      confirm = confirm_fixture()
      assert {:error, %Ecto.Changeset{}} = Database.update_confirm(confirm, @invalid_attrs)
      assert confirm == Database.get_confirm!(confirm.id)
    end

    test "delete_confirm/1 deletes the confirm" do
      confirm = confirm_fixture()
      assert {:ok, %Confirm{}} = Database.delete_confirm(confirm)
      assert_raise Ecto.NoResultsError, fn -> Database.get_confirm!(confirm.id) end
    end

    test "change_confirm/1 returns a confirm changeset" do
      confirm = confirm_fixture()
      assert %Ecto.Changeset{} = Database.change_confirm(confirm)
    end
  end

  describe "auth_access" do
    alias Api.Database.AuthAccess

    import Api.DatabaseFixtures

    @invalid_attrs %{auth_post: nil, auth_read: nil, auth_reply: nil, auth_view: nil, forum_id: nil, group_id: nil}

    test "list_auth_access/0 returns all auth_access" do
      auth_access = auth_access_fixture()
      assert Database.list_auth_access() == [auth_access]
    end

    test "get_auth_access!/1 returns the auth_access with given id" do
      auth_access = auth_access_fixture()
      assert Database.get_auth_access!(auth_access.id) == auth_access
    end

    test "create_auth_access/1 with valid data creates a auth_access" do
      valid_attrs = %{auth_post: 42, auth_read: 42, auth_reply: 42, auth_view: 42, forum_id: 42, group_id: 42}

      assert {:ok, %AuthAccess{} = auth_access} = Database.create_auth_access(valid_attrs)
      assert auth_access.auth_post == 42
      assert auth_access.auth_read == 42
      assert auth_access.auth_reply == 42
      assert auth_access.auth_view == 42
      assert auth_access.forum_id == 42
      assert auth_access.group_id == 42
    end

    test "create_auth_access/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Database.create_auth_access(@invalid_attrs)
    end

    test "update_auth_access/2 with valid data updates the auth_access" do
      auth_access = auth_access_fixture()
      update_attrs = %{auth_post: 43, auth_read: 43, auth_reply: 43, auth_view: 43, forum_id: 43, group_id: 43}

      assert {:ok, %AuthAccess{} = auth_access} = Database.update_auth_access(auth_access, update_attrs)
      assert auth_access.auth_post == 43
      assert auth_access.auth_read == 43
      assert auth_access.auth_reply == 43
      assert auth_access.auth_view == 43
      assert auth_access.forum_id == 43
      assert auth_access.group_id == 43
    end

    test "update_auth_access/2 with invalid data returns error changeset" do
      auth_access = auth_access_fixture()
      assert {:error, %Ecto.Changeset{}} = Database.update_auth_access(auth_access, @invalid_attrs)
      assert auth_access == Database.get_auth_access!(auth_access.id)
    end

    test "delete_auth_access/1 deletes the auth_access" do
      auth_access = auth_access_fixture()
      assert {:ok, %AuthAccess{}} = Database.delete_auth_access(auth_access)
      assert_raise Ecto.NoResultsError, fn -> Database.get_auth_access!(auth_access.id) end
    end

    test "change_auth_access/1 returns a auth_access changeset" do
      auth_access = auth_access_fixture()
      assert %Ecto.Changeset{} = Database.change_auth_access(auth_access)
    end
  end

  describe "config" do
    alias Api.Database.Config

    import Api.DatabaseFixtures

    @invalid_attrs %{config_name: nil, config_value: nil}

    test "list_config/0 returns all config" do
      config = config_fixture()
      assert Database.list_config() == [config]
    end

    test "get_config!/1 returns the config with given id" do
      config = config_fixture()
      assert Database.get_config!(config.id) == config
    end

    test "create_config/1 with valid data creates a config" do
      valid_attrs = %{config_name: "some config_name", config_value: "some config_value"}

      assert {:ok, %Config{} = config} = Database.create_config(valid_attrs)
      assert config.config_name == "some config_name"
      assert config.config_value == "some config_value"
    end

    test "create_config/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Database.create_config(@invalid_attrs)
    end

    test "update_config/2 with valid data updates the config" do
      config = config_fixture()
      update_attrs = %{config_name: "some updated config_name", config_value: "some updated config_value"}

      assert {:ok, %Config{} = config} = Database.update_config(config, update_attrs)
      assert config.config_name == "some updated config_name"
      assert config.config_value == "some updated config_value"
    end

    test "update_config/2 with invalid data returns error changeset" do
      config = config_fixture()
      assert {:error, %Ecto.Changeset{}} = Database.update_config(config, @invalid_attrs)
      assert config == Database.get_config!(config.id)
    end

    test "delete_config/1 deletes the config" do
      config = config_fixture()
      assert {:ok, %Config{}} = Database.delete_config(config)
      assert_raise Ecto.NoResultsError, fn -> Database.get_config!(config.id) end
    end

    test "change_config/1 returns a config changeset" do
      config = config_fixture()
      assert %Ecto.Changeset{} = Database.change_config(config)
    end
  end

  describe "disallow" do
    alias Api.Database.Disallow

    import Api.DatabaseFixtures

    @invalid_attrs %{disallow_id: nil, disallow_username: nil}

    test "list_disallow/0 returns all disallow" do
      disallow = disallow_fixture()
      assert Database.list_disallow() == [disallow]
    end

    test "get_disallow!/1 returns the disallow with given id" do
      disallow = disallow_fixture()
      assert Database.get_disallow!(disallow.id) == disallow
    end

    test "create_disallow/1 with valid data creates a disallow" do
      valid_attrs = %{disallow_id: 42, disallow_username: "some disallow_username"}

      assert {:ok, %Disallow{} = disallow} = Database.create_disallow(valid_attrs)
      assert disallow.disallow_id == 42
      assert disallow.disallow_username == "some disallow_username"
    end

    test "create_disallow/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Database.create_disallow(@invalid_attrs)
    end

    test "update_disallow/2 with valid data updates the disallow" do
      disallow = disallow_fixture()
      update_attrs = %{disallow_id: 43, disallow_username: "some updated disallow_username"}

      assert {:ok, %Disallow{} = disallow} = Database.update_disallow(disallow, update_attrs)
      assert disallow.disallow_id == 43
      assert disallow.disallow_username == "some updated disallow_username"
    end

    test "update_disallow/2 with invalid data returns error changeset" do
      disallow = disallow_fixture()
      assert {:error, %Ecto.Changeset{}} = Database.update_disallow(disallow, @invalid_attrs)
      assert disallow == Database.get_disallow!(disallow.id)
    end

    test "delete_disallow/1 deletes the disallow" do
      disallow = disallow_fixture()
      assert {:ok, %Disallow{}} = Database.delete_disallow(disallow)
      assert_raise Ecto.NoResultsError, fn -> Database.get_disallow!(disallow.id) end
    end

    test "change_disallow/1 returns a disallow changeset" do
      disallow = disallow_fixture()
      assert %Ecto.Changeset{} = Database.change_disallow(disallow)
    end
  end

  describe "forums" do
    alias Api.Database.Forum

    import Api.DatabaseFixtures

    @invalid_attrs %{auth_announce: nil, auth_attachments: nil, auth_delete: nil, auth_edit: nil, auth_pollcreate: nil, auth_post: nil, auth_read: nil, auth_reply: nil, auth_sticky: nil, auth_view: nil, auth_vote: nil, cat_id: nil, forum_desc: nil, forum_id: nil, forum_last_post_id: nil, forum_name: nil, forum_order: nil, forum_posts: nil, forum_status: nil, forum_topics: nil, prune_enable: nil, prune_next: nil}

    test "list_forums/0 returns all forums" do
      forum = forum_fixture()
      assert Database.list_forums() == [forum]
    end

    test "get_forum!/1 returns the forum with given id" do
      forum = forum_fixture()
      assert Database.get_forum!(forum.id) == forum
    end

    test "create_forum/1 with valid data creates a forum" do
      valid_attrs = %{auth_announce: 42, auth_attachments: 42, auth_delete: 42, auth_edit: 42, auth_pollcreate: 42, auth_post: 42, auth_read: 42, auth_reply: 42, auth_sticky: 42, auth_view: 42, auth_vote: 42, cat_id: 42, forum_desc: "some forum_desc", forum_id: 42, forum_last_post_id: 42, forum_name: "some forum_name", forum_order: 42, forum_posts: 42, forum_status: 42, forum_topics: 42, prune_enable: 42, prune_next: 42}

      assert {:ok, %Forum{} = forum} = Database.create_forum(valid_attrs)
      assert forum.auth_announce == 42
      assert forum.auth_attachments == 42
      assert forum.auth_delete == 42
      assert forum.auth_edit == 42
      assert forum.auth_pollcreate == 42
      assert forum.auth_post == 42
      assert forum.auth_read == 42
      assert forum.auth_reply == 42
      assert forum.auth_sticky == 42
      assert forum.auth_view == 42
      assert forum.auth_vote == 42
      assert forum.cat_id == 42
      assert forum.forum_desc == "some forum_desc"
      assert forum.forum_id == 42
      assert forum.forum_last_post_id == 42
      assert forum.forum_name == "some forum_name"
      assert forum.forum_order == 42
      assert forum.forum_posts == 42
      assert forum.forum_status == 42
      assert forum.forum_topics == 42
      assert forum.prune_enable == 42
      assert forum.prune_next == 42
    end

    test "create_forum/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Database.create_forum(@invalid_attrs)
    end

    test "update_forum/2 with valid data updates the forum" do
      forum = forum_fixture()
      update_attrs = %{auth_announce: 43, auth_attachments: 43, auth_delete: 43, auth_edit: 43, auth_pollcreate: 43, auth_post: 43, auth_read: 43, auth_reply: 43, auth_sticky: 43, auth_view: 43, auth_vote: 43, cat_id: 43, forum_desc: "some updated forum_desc", forum_id: 43, forum_last_post_id: 43, forum_name: "some updated forum_name", forum_order: 43, forum_posts: 43, forum_status: 43, forum_topics: 43, prune_enable: 43, prune_next: 43}

      assert {:ok, %Forum{} = forum} = Database.update_forum(forum, update_attrs)
      assert forum.auth_announce == 43
      assert forum.auth_attachments == 43
      assert forum.auth_delete == 43
      assert forum.auth_edit == 43
      assert forum.auth_pollcreate == 43
      assert forum.auth_post == 43
      assert forum.auth_read == 43
      assert forum.auth_reply == 43
      assert forum.auth_sticky == 43
      assert forum.auth_view == 43
      assert forum.auth_vote == 43
      assert forum.cat_id == 43
      assert forum.forum_desc == "some updated forum_desc"
      assert forum.forum_id == 43
      assert forum.forum_last_post_id == 43
      assert forum.forum_name == "some updated forum_name"
      assert forum.forum_order == 43
      assert forum.forum_posts == 43
      assert forum.forum_status == 43
      assert forum.forum_topics == 43
      assert forum.prune_enable == 43
      assert forum.prune_next == 43
    end

    test "update_forum/2 with invalid data returns error changeset" do
      forum = forum_fixture()
      assert {:error, %Ecto.Changeset{}} = Database.update_forum(forum, @invalid_attrs)
      assert forum == Database.get_forum!(forum.id)
    end

    test "delete_forum/1 deletes the forum" do
      forum = forum_fixture()
      assert {:ok, %Forum{}} = Database.delete_forum(forum)
      assert_raise Ecto.NoResultsError, fn -> Database.get_forum!(forum.id) end
    end

    test "change_forum/1 returns a forum changeset" do
      forum = forum_fixture()
      assert %Ecto.Changeset{} = Database.change_forum(forum)
    end
  end

  describe "forum_prune" do
    alias Api.Database.ForumPrune

    import Api.DatabaseFixtures

    @invalid_attrs %{forum_id: nil, prune_days: nil, prune_freq: nil, prune_id: nil}

    test "list_forum_prune/0 returns all forum_prune" do
      forum_prune = forum_prune_fixture()
      assert Database.list_forum_prune() == [forum_prune]
    end

    test "get_forum_prune!/1 returns the forum_prune with given id" do
      forum_prune = forum_prune_fixture()
      assert Database.get_forum_prune!(forum_prune.id) == forum_prune
    end

    test "create_forum_prune/1 with valid data creates a forum_prune" do
      valid_attrs = %{forum_id: 42, prune_days: 42, prune_freq: 42, prune_id: 42}

      assert {:ok, %ForumPrune{} = forum_prune} = Database.create_forum_prune(valid_attrs)
      assert forum_prune.forum_id == 42
      assert forum_prune.prune_days == 42
      assert forum_prune.prune_freq == 42
      assert forum_prune.prune_id == 42
    end

    test "create_forum_prune/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Database.create_forum_prune(@invalid_attrs)
    end

    test "update_forum_prune/2 with valid data updates the forum_prune" do
      forum_prune = forum_prune_fixture()
      update_attrs = %{forum_id: 43, prune_days: 43, prune_freq: 43, prune_id: 43}

      assert {:ok, %ForumPrune{} = forum_prune} = Database.update_forum_prune(forum_prune, update_attrs)
      assert forum_prune.forum_id == 43
      assert forum_prune.prune_days == 43
      assert forum_prune.prune_freq == 43
      assert forum_prune.prune_id == 43
    end

    test "update_forum_prune/2 with invalid data returns error changeset" do
      forum_prune = forum_prune_fixture()
      assert {:error, %Ecto.Changeset{}} = Database.update_forum_prune(forum_prune, @invalid_attrs)
      assert forum_prune == Database.get_forum_prune!(forum_prune.id)
    end

    test "delete_forum_prune/1 deletes the forum_prune" do
      forum_prune = forum_prune_fixture()
      assert {:ok, %ForumPrune{}} = Database.delete_forum_prune(forum_prune)
      assert_raise Ecto.NoResultsError, fn -> Database.get_forum_prune!(forum_prune.id) end
    end

    test "change_forum_prune/1 returns a forum_prune changeset" do
      forum_prune = forum_prune_fixture()
      assert %Ecto.Changeset{} = Database.change_forum_prune(forum_prune)
    end
  end

  describe "posts" do
    alias Api.Database.Post

    import Api.DatabaseFixtures

    @invalid_attrs %{enable_bbcode: nil, enable_html: nil, enable_sig: nil, enable_smilies: nil, forum_id: nil, post_edit_count: nil, post_edit_time: nil, post_id: nil, post_time: nil, post_username: nil, poster_id: nil, poster_ip: nil, topic_id: nil}

    test "list_posts/0 returns all posts" do
      post = post_fixture()
      assert Database.list_posts() == [post]
    end

    test "get_post!/1 returns the post with given id" do
      post = post_fixture()
      assert Database.get_post!(post.id) == post
    end

    test "create_post/1 with valid data creates a post" do
      valid_attrs = %{enable_bbcode: 42, enable_html: 42, enable_sig: 42, enable_smilies: 42, forum_id: 42, post_edit_count: 42, post_edit_time: 42, post_id: 42, post_time: 42, post_username: "some post_username", poster_id: 42, poster_ip: "some poster_ip", topic_id: 42}

      assert {:ok, %Post{} = post} = Database.create_post(valid_attrs)
      assert post.enable_bbcode == 42
      assert post.enable_html == 42
      assert post.enable_sig == 42
      assert post.enable_smilies == 42
      assert post.forum_id == 42
      assert post.post_edit_count == 42
      assert post.post_edit_time == 42
      assert post.post_id == 42
      assert post.post_time == 42
      assert post.post_username == "some post_username"
      assert post.poster_id == 42
      assert post.poster_ip == "some poster_ip"
      assert post.topic_id == 42
    end

    test "create_post/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Database.create_post(@invalid_attrs)
    end

    test "update_post/2 with valid data updates the post" do
      post = post_fixture()
      update_attrs = %{enable_bbcode: 43, enable_html: 43, enable_sig: 43, enable_smilies: 43, forum_id: 43, post_edit_count: 43, post_edit_time: 43, post_id: 43, post_time: 43, post_username: "some updated post_username", poster_id: 43, poster_ip: "some updated poster_ip", topic_id: 43}

      assert {:ok, %Post{} = post} = Database.update_post(post, update_attrs)
      assert post.enable_bbcode == 43
      assert post.enable_html == 43
      assert post.enable_sig == 43
      assert post.enable_smilies == 43
      assert post.forum_id == 43
      assert post.post_edit_count == 43
      assert post.post_edit_time == 43
      assert post.post_id == 43
      assert post.post_time == 43
      assert post.post_username == "some updated post_username"
      assert post.poster_id == 43
      assert post.poster_ip == "some updated poster_ip"
      assert post.topic_id == 43
    end

    test "update_post/2 with invalid data returns error changeset" do
      post = post_fixture()
      assert {:error, %Ecto.Changeset{}} = Database.update_post(post, @invalid_attrs)
      assert post == Database.get_post!(post.id)
    end

    test "delete_post/1 deletes the post" do
      post = post_fixture()
      assert {:ok, %Post{}} = Database.delete_post(post)
      assert_raise Ecto.NoResultsError, fn -> Database.get_post!(post.id) end
    end

    test "change_post/1 returns a post changeset" do
      post = post_fixture()
      assert %Ecto.Changeset{} = Database.change_post(post)
    end
  end

  describe "posts_text" do
    alias Api.Database.PostText

    import Api.DatabaseFixtures

    @invalid_attrs %{bbcode_uid: nil, post_id: nil, post_subject: nil, post_text: nil}

    test "list_posts_text/0 returns all posts_text" do
      post_text = post_text_fixture()
      assert Database.list_posts_text() == [post_text]
    end

    test "get_post_text!/1 returns the post_text with given id" do
      post_text = post_text_fixture()
      assert Database.get_post_text!(post_text.id) == post_text
    end

    test "create_post_text/1 with valid data creates a post_text" do
      valid_attrs = %{bbcode_uid: "some bbcode_uid", post_id: 42, post_subject: "some post_subject", post_text: "some post_text"}

      assert {:ok, %PostText{} = post_text} = Database.create_post_text(valid_attrs)
      assert post_text.bbcode_uid == "some bbcode_uid"
      assert post_text.post_id == 42
      assert post_text.post_subject == "some post_subject"
      assert post_text.post_text == "some post_text"
    end

    test "create_post_text/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Database.create_post_text(@invalid_attrs)
    end

    test "update_post_text/2 with valid data updates the post_text" do
      post_text = post_text_fixture()
      update_attrs = %{bbcode_uid: "some updated bbcode_uid", post_id: 43, post_subject: "some updated post_subject", post_text: "some updated post_text"}

      assert {:ok, %PostText{} = post_text} = Database.update_post_text(post_text, update_attrs)
      assert post_text.bbcode_uid == "some updated bbcode_uid"
      assert post_text.post_id == 43
      assert post_text.post_subject == "some updated post_subject"
      assert post_text.post_text == "some updated post_text"
    end

    test "update_post_text/2 with invalid data returns error changeset" do
      post_text = post_text_fixture()
      assert {:error, %Ecto.Changeset{}} = Database.update_post_text(post_text, @invalid_attrs)
      assert post_text == Database.get_post_text!(post_text.id)
    end

    test "delete_post_text/1 deletes the post_text" do
      post_text = post_text_fixture()
      assert {:ok, %PostText{}} = Database.delete_post_text(post_text)
      assert_raise Ecto.NoResultsError, fn -> Database.get_post_text!(post_text.id) end
    end

    test "change_post_text/1 returns a post_text changeset" do
      post_text = post_text_fixture()
      assert %Ecto.Changeset{} = Database.change_post_text(post_text)
    end
  end

  describe "privmsgs" do
    alias Api.Database.PrivMsg

    import Api.DatabaseFixtures

    @invalid_attrs %{privmsgs_attach_sig: nil, privmsgs_date: nil, privmsgs_enable_bbcode: nil, privmsgs_enable_html: nil, privmsgs_enable_smilies: nil, privmsgs_from_userid: nil, privmsgs_id: nil, privmsgs_ip: nil, privmsgs_subject: nil, privmsgs_to_userid: nil, privmsgs_type: nil}

    test "list_privmsgs/0 returns all privmsgs" do
      priv_msg = priv_msg_fixture()
      assert Database.list_privmsgs() == [priv_msg]
    end

    test "get_priv_msg!/1 returns the priv_msg with given id" do
      priv_msg = priv_msg_fixture()
      assert Database.get_priv_msg!(priv_msg.id) == priv_msg
    end

    test "create_priv_msg/1 with valid data creates a priv_msg" do
      valid_attrs = %{privmsgs_attach_sig: 42, privmsgs_date: 42, privmsgs_enable_bbcode: 42, privmsgs_enable_html: 42, privmsgs_enable_smilies: 42, privmsgs_from_userid: 42, privmsgs_id: 42, privmsgs_ip: "some privmsgs_ip", privmsgs_subject: "some privmsgs_subject", privmsgs_to_userid: 42, privmsgs_type: 42}

      assert {:ok, %PrivMsg{} = priv_msg} = Database.create_priv_msg(valid_attrs)
      assert priv_msg.privmsgs_attach_sig == 42
      assert priv_msg.privmsgs_date == 42
      assert priv_msg.privmsgs_enable_bbcode == 42
      assert priv_msg.privmsgs_enable_html == 42
      assert priv_msg.privmsgs_enable_smilies == 42
      assert priv_msg.privmsgs_from_userid == 42
      assert priv_msg.privmsgs_id == 42
      assert priv_msg.privmsgs_ip == "some privmsgs_ip"
      assert priv_msg.privmsgs_subject == "some privmsgs_subject"
      assert priv_msg.privmsgs_to_userid == 42
      assert priv_msg.privmsgs_type == 42
    end

    test "create_priv_msg/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Database.create_priv_msg(@invalid_attrs)
    end

    test "update_priv_msg/2 with valid data updates the priv_msg" do
      priv_msg = priv_msg_fixture()
      update_attrs = %{privmsgs_attach_sig: 43, privmsgs_date: 43, privmsgs_enable_bbcode: 43, privmsgs_enable_html: 43, privmsgs_enable_smilies: 43, privmsgs_from_userid: 43, privmsgs_id: 43, privmsgs_ip: "some updated privmsgs_ip", privmsgs_subject: "some updated privmsgs_subject", privmsgs_to_userid: 43, privmsgs_type: 43}

      assert {:ok, %PrivMsg{} = priv_msg} = Database.update_priv_msg(priv_msg, update_attrs)
      assert priv_msg.privmsgs_attach_sig == 43
      assert priv_msg.privmsgs_date == 43
      assert priv_msg.privmsgs_enable_bbcode == 43
      assert priv_msg.privmsgs_enable_html == 43
      assert priv_msg.privmsgs_enable_smilies == 43
      assert priv_msg.privmsgs_from_userid == 43
      assert priv_msg.privmsgs_id == 43
      assert priv_msg.privmsgs_ip == "some updated privmsgs_ip"
      assert priv_msg.privmsgs_subject == "some updated privmsgs_subject"
      assert priv_msg.privmsgs_to_userid == 43
      assert priv_msg.privmsgs_type == 43
    end

    test "update_priv_msg/2 with invalid data returns error changeset" do
      priv_msg = priv_msg_fixture()
      assert {:error, %Ecto.Changeset{}} = Database.update_priv_msg(priv_msg, @invalid_attrs)
      assert priv_msg == Database.get_priv_msg!(priv_msg.id)
    end

    test "delete_priv_msg/1 deletes the priv_msg" do
      priv_msg = priv_msg_fixture()
      assert {:ok, %PrivMsg{}} = Database.delete_priv_msg(priv_msg)
      assert_raise Ecto.NoResultsError, fn -> Database.get_priv_msg!(priv_msg.id) end
    end

    test "change_priv_msg/1 returns a priv_msg changeset" do
      priv_msg = priv_msg_fixture()
      assert %Ecto.Changeset{} = Database.change_priv_msg(priv_msg)
    end
  end

  describe "privmsgs_text" do
    alias Api.Database.PrivMsgText

    import Api.DatabaseFixtures

    @invalid_attrs %{privmsgs_bbcode_uid: nil, privmsgs_text: nil, privmsgs_text_id: nil}

    test "list_privmsgs_text/0 returns all privmsgs_text" do
      priv_msg_text = priv_msg_text_fixture()
      assert Database.list_privmsgs_text() == [priv_msg_text]
    end

    test "get_priv_msg_text!/1 returns the priv_msg_text with given id" do
      priv_msg_text = priv_msg_text_fixture()
      assert Database.get_priv_msg_text!(priv_msg_text.id) == priv_msg_text
    end

    test "create_priv_msg_text/1 with valid data creates a priv_msg_text" do
      valid_attrs = %{privmsgs_bbcode_uid: "some privmsgs_bbcode_uid", privmsgs_text: "some privmsgs_text", privmsgs_text_id: 42}

      assert {:ok, %PrivMsgText{} = priv_msg_text} = Database.create_priv_msg_text(valid_attrs)
      assert priv_msg_text.privmsgs_bbcode_uid == "some privmsgs_bbcode_uid"
      assert priv_msg_text.privmsgs_text == "some privmsgs_text"
      assert priv_msg_text.privmsgs_text_id == 42
    end

    test "create_priv_msg_text/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Database.create_priv_msg_text(@invalid_attrs)
    end

    test "update_priv_msg_text/2 with valid data updates the priv_msg_text" do
      priv_msg_text = priv_msg_text_fixture()
      update_attrs = %{privmsgs_bbcode_uid: "some updated privmsgs_bbcode_uid", privmsgs_text: "some updated privmsgs_text", privmsgs_text_id: 43}

      assert {:ok, %PrivMsgText{} = priv_msg_text} = Database.update_priv_msg_text(priv_msg_text, update_attrs)
      assert priv_msg_text.privmsgs_bbcode_uid == "some updated privmsgs_bbcode_uid"
      assert priv_msg_text.privmsgs_text == "some updated privmsgs_text"
      assert priv_msg_text.privmsgs_text_id == 43
    end

    test "update_priv_msg_text/2 with invalid data returns error changeset" do
      priv_msg_text = priv_msg_text_fixture()
      assert {:error, %Ecto.Changeset{}} = Database.update_priv_msg_text(priv_msg_text, @invalid_attrs)
      assert priv_msg_text == Database.get_priv_msg_text!(priv_msg_text.id)
    end

    test "delete_priv_msg_text/1 deletes the priv_msg_text" do
      priv_msg_text = priv_msg_text_fixture()
      assert {:ok, %PrivMsgText{}} = Database.delete_priv_msg_text(priv_msg_text)
      assert_raise Ecto.NoResultsError, fn -> Database.get_priv_msg_text!(priv_msg_text.id) end
    end

    test "change_priv_msg_text/1 returns a priv_msg_text changeset" do
      priv_msg_text = priv_msg_text_fixture()
      assert %Ecto.Changeset{} = Database.change_priv_msg_text(priv_msg_text)
    end
  end

  describe "ranks" do
    alias Api.Database.Rank

    import Api.DatabaseFixtures

    @invalid_attrs %{rank_id: nil, rank_image: nil, rank_min: nil, rank_special: nil, rank_title: nil}

    test "list_ranks/0 returns all ranks" do
      rank = rank_fixture()
      assert Database.list_ranks() == [rank]
    end

    test "get_rank!/1 returns the rank with given id" do
      rank = rank_fixture()
      assert Database.get_rank!(rank.id) == rank
    end

    test "create_rank/1 with valid data creates a rank" do
      valid_attrs = %{rank_id: 42, rank_image: "some rank_image", rank_min: 42, rank_special: 42, rank_title: "some rank_title"}

      assert {:ok, %Rank{} = rank} = Database.create_rank(valid_attrs)
      assert rank.rank_id == 42
      assert rank.rank_image == "some rank_image"
      assert rank.rank_min == 42
      assert rank.rank_special == 42
      assert rank.rank_title == "some rank_title"
    end

    test "create_rank/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Database.create_rank(@invalid_attrs)
    end

    test "update_rank/2 with valid data updates the rank" do
      rank = rank_fixture()
      update_attrs = %{rank_id: 43, rank_image: "some updated rank_image", rank_min: 43, rank_special: 43, rank_title: "some updated rank_title"}

      assert {:ok, %Rank{} = rank} = Database.update_rank(rank, update_attrs)
      assert rank.rank_id == 43
      assert rank.rank_image == "some updated rank_image"
      assert rank.rank_min == 43
      assert rank.rank_special == 43
      assert rank.rank_title == "some updated rank_title"
    end

    test "update_rank/2 with invalid data returns error changeset" do
      rank = rank_fixture()
      assert {:error, %Ecto.Changeset{}} = Database.update_rank(rank, @invalid_attrs)
      assert rank == Database.get_rank!(rank.id)
    end

    test "delete_rank/1 deletes the rank" do
      rank = rank_fixture()
      assert {:ok, %Rank{}} = Database.delete_rank(rank)
      assert_raise Ecto.NoResultsError, fn -> Database.get_rank!(rank.id) end
    end

    test "change_rank/1 returns a rank changeset" do
      rank = rank_fixture()
      assert %Ecto.Changeset{} = Database.change_rank(rank)
    end
  end

  describe "search_results" do
    alias Api.Database.SearchResult

    import Api.DatabaseFixtures

    @invalid_attrs %{search_array: nil, search_id: nil, search_time: nil, session_id: nil}

    test "list_search_results/0 returns all search_results" do
      search_result = search_result_fixture()
      assert Database.list_search_results() == [search_result]
    end

    test "get_search_result!/1 returns the search_result with given id" do
      search_result = search_result_fixture()
      assert Database.get_search_result!(search_result.id) == search_result
    end

    test "create_search_result/1 with valid data creates a search_result" do
      valid_attrs = %{search_array: "some search_array", search_id: 42, search_time: 42, session_id: 42}

      assert {:ok, %SearchResult{} = search_result} = Database.create_search_result(valid_attrs)
      assert search_result.search_array == "some search_array"
      assert search_result.search_id == 42
      assert search_result.search_time == 42
      assert search_result.session_id == 42
    end

    test "create_search_result/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Database.create_search_result(@invalid_attrs)
    end

    test "update_search_result/2 with valid data updates the search_result" do
      search_result = search_result_fixture()
      update_attrs = %{search_array: "some updated search_array", search_id: 43, search_time: 43, session_id: 43}

      assert {:ok, %SearchResult{} = search_result} = Database.update_search_result(search_result, update_attrs)
      assert search_result.search_array == "some updated search_array"
      assert search_result.search_id == 43
      assert search_result.search_time == 43
      assert search_result.session_id == 43
    end

    test "update_search_result/2 with invalid data returns error changeset" do
      search_result = search_result_fixture()
      assert {:error, %Ecto.Changeset{}} = Database.update_search_result(search_result, @invalid_attrs)
      assert search_result == Database.get_search_result!(search_result.id)
    end

    test "delete_search_result/1 deletes the search_result" do
      search_result = search_result_fixture()
      assert {:ok, %SearchResult{}} = Database.delete_search_result(search_result)
      assert_raise Ecto.NoResultsError, fn -> Database.get_search_result!(search_result.id) end
    end

    test "change_search_result/1 returns a search_result changeset" do
      search_result = search_result_fixture()
      assert %Ecto.Changeset{} = Database.change_search_result(search_result)
    end
  end

  describe "search_wordlist" do
    alias Api.Database.SearchWordlist

    import Api.DatabaseFixtures

    @invalid_attrs %{word_common: nil, word_id: nil, word_text: nil}

    test "list_search_wordlist/0 returns all search_wordlist" do
      search_wordlist = search_wordlist_fixture()
      assert Database.list_search_wordlist() == [search_wordlist]
    end

    test "get_search_wordlist!/1 returns the search_wordlist with given id" do
      search_wordlist = search_wordlist_fixture()
      assert Database.get_search_wordlist!(search_wordlist.id) == search_wordlist
    end

    test "create_search_wordlist/1 with valid data creates a search_wordlist" do
      valid_attrs = %{word_common: "some word_common", word_id: 42, word_text: "some word_text"}

      assert {:ok, %SearchWordlist{} = search_wordlist} = Database.create_search_wordlist(valid_attrs)
      assert search_wordlist.word_common == "some word_common"
      assert search_wordlist.word_id == 42
      assert search_wordlist.word_text == "some word_text"
    end

    test "create_search_wordlist/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Database.create_search_wordlist(@invalid_attrs)
    end

    test "update_search_wordlist/2 with valid data updates the search_wordlist" do
      search_wordlist = search_wordlist_fixture()
      update_attrs = %{word_common: "some updated word_common", word_id: 43, word_text: "some updated word_text"}

      assert {:ok, %SearchWordlist{} = search_wordlist} = Database.update_search_wordlist(search_wordlist, update_attrs)
      assert search_wordlist.word_common == "some updated word_common"
      assert search_wordlist.word_id == 43
      assert search_wordlist.word_text == "some updated word_text"
    end

    test "update_search_wordlist/2 with invalid data returns error changeset" do
      search_wordlist = search_wordlist_fixture()
      assert {:error, %Ecto.Changeset{}} = Database.update_search_wordlist(search_wordlist, @invalid_attrs)
      assert search_wordlist == Database.get_search_wordlist!(search_wordlist.id)
    end

    test "delete_search_wordlist/1 deletes the search_wordlist" do
      search_wordlist = search_wordlist_fixture()
      assert {:ok, %SearchWordlist{}} = Database.delete_search_wordlist(search_wordlist)
      assert_raise Ecto.NoResultsError, fn -> Database.get_search_wordlist!(search_wordlist.id) end
    end

    test "change_search_wordlist/1 returns a search_wordlist changeset" do
      search_wordlist = search_wordlist_fixture()
      assert %Ecto.Changeset{} = Database.change_search_wordlist(search_wordlist)
    end
  end

  describe "search_wordmatch" do
    alias Api.Database.SearchWordmatch

    import Api.DatabaseFixtures

    @invalid_attrs %{post_id: nil, title_match: nil, word_id: nil}

    test "list_search_wordmatch/0 returns all search_wordmatch" do
      search_wordmatch = search_wordmatch_fixture()
      assert Database.list_search_wordmatch() == [search_wordmatch]
    end

    test "get_search_wordmatch!/1 returns the search_wordmatch with given id" do
      search_wordmatch = search_wordmatch_fixture()
      assert Database.get_search_wordmatch!(search_wordmatch.id) == search_wordmatch
    end

    test "create_search_wordmatch/1 with valid data creates a search_wordmatch" do
      valid_attrs = %{post_id: 42, title_match: 42, word_id: 42}

      assert {:ok, %SearchWordmatch{} = search_wordmatch} = Database.create_search_wordmatch(valid_attrs)
      assert search_wordmatch.post_id == 42
      assert search_wordmatch.title_match == 42
      assert search_wordmatch.word_id == 42
    end

    test "create_search_wordmatch/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Database.create_search_wordmatch(@invalid_attrs)
    end

    test "update_search_wordmatch/2 with valid data updates the search_wordmatch" do
      search_wordmatch = search_wordmatch_fixture()
      update_attrs = %{post_id: 43, title_match: 43, word_id: 43}

      assert {:ok, %SearchWordmatch{} = search_wordmatch} = Database.update_search_wordmatch(search_wordmatch, update_attrs)
      assert search_wordmatch.post_id == 43
      assert search_wordmatch.title_match == 43
      assert search_wordmatch.word_id == 43
    end

    test "update_search_wordmatch/2 with invalid data returns error changeset" do
      search_wordmatch = search_wordmatch_fixture()
      assert {:error, %Ecto.Changeset{}} = Database.update_search_wordmatch(search_wordmatch, @invalid_attrs)
      assert search_wordmatch == Database.get_search_wordmatch!(search_wordmatch.id)
    end

    test "delete_search_wordmatch/1 deletes the search_wordmatch" do
      search_wordmatch = search_wordmatch_fixture()
      assert {:ok, %SearchWordmatch{}} = Database.delete_search_wordmatch(search_wordmatch)
      assert_raise Ecto.NoResultsError, fn -> Database.get_search_wordmatch!(search_wordmatch.id) end
    end

    test "change_search_wordmatch/1 returns a search_wordmatch changeset" do
      search_wordmatch = search_wordmatch_fixture()
      assert %Ecto.Changeset{} = Database.change_search_wordmatch(search_wordmatch)
    end
  end

  describe "sessions" do
    alias Api.Database.Session

    import Api.DatabaseFixtures

    @invalid_attrs %{session_admin: nil, session_id: nil, session_ip: nil, session_logged_in: nil, session_page: nil, session_start: nil, session_time: nil, session_user_id: nil}

    test "list_sessions/0 returns all sessions" do
      session = session_fixture()
      assert Database.list_sessions() == [session]
    end

    test "get_session!/1 returns the session with given id" do
      session = session_fixture()
      assert Database.get_session!(session.id) == session
    end

    test "create_session/1 with valid data creates a session" do
      valid_attrs = %{session_admin: 42, session_id: "some session_id", session_ip: "some session_ip", session_logged_in: 42, session_page: 42, session_start: 42, session_time: 42, session_user_id: 42}

      assert {:ok, %Session{} = session} = Database.create_session(valid_attrs)
      assert session.session_admin == 42
      assert session.session_id == "some session_id"
      assert session.session_ip == "some session_ip"
      assert session.session_logged_in == 42
      assert session.session_page == 42
      assert session.session_start == 42
      assert session.session_time == 42
      assert session.session_user_id == 42
    end

    test "create_session/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Database.create_session(@invalid_attrs)
    end

    test "update_session/2 with valid data updates the session" do
      session = session_fixture()
      update_attrs = %{session_admin: 43, session_id: "some updated session_id", session_ip: "some updated session_ip", session_logged_in: 43, session_page: 43, session_start: 43, session_time: 43, session_user_id: 43}

      assert {:ok, %Session{} = session} = Database.update_session(session, update_attrs)
      assert session.session_admin == 43
      assert session.session_id == "some updated session_id"
      assert session.session_ip == "some updated session_ip"
      assert session.session_logged_in == 43
      assert session.session_page == 43
      assert session.session_start == 43
      assert session.session_time == 43
      assert session.session_user_id == 43
    end

    test "update_session/2 with invalid data returns error changeset" do
      session = session_fixture()
      assert {:error, %Ecto.Changeset{}} = Database.update_session(session, @invalid_attrs)
      assert session == Database.get_session!(session.id)
    end

    test "delete_session/1 deletes the session" do
      session = session_fixture()
      assert {:ok, %Session{}} = Database.delete_session(session)
      assert_raise Ecto.NoResultsError, fn -> Database.get_session!(session.id) end
    end

    test "change_session/1 returns a session changeset" do
      session = session_fixture()
      assert %Ecto.Changeset{} = Database.change_session(session)
    end
  end

  describe "sessions_keys" do
    alias Api.Database.SessionKeys

    import Api.DatabaseFixtures

    @invalid_attrs %{key_id: nil, last_ip: nil, last_login: nil, user_id: nil}

    test "list_sessions_keys/0 returns all sessions_keys" do
      session_keys = session_keys_fixture()
      assert Database.list_sessions_keys() == [session_keys]
    end

    test "get_session_keys!/1 returns the session_keys with given id" do
      session_keys = session_keys_fixture()
      assert Database.get_session_keys!(session_keys.id) == session_keys
    end

    test "create_session_keys/1 with valid data creates a session_keys" do
      valid_attrs = %{key_id: "some key_id", last_ip: "some last_ip", last_login: 42, user_id: 42}

      assert {:ok, %SessionKeys{} = session_keys} = Database.create_session_keys(valid_attrs)
      assert session_keys.key_id == "some key_id"
      assert session_keys.last_ip == "some last_ip"
      assert session_keys.last_login == 42
      assert session_keys.user_id == 42
    end

    test "create_session_keys/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Database.create_session_keys(@invalid_attrs)
    end

    test "update_session_keys/2 with valid data updates the session_keys" do
      session_keys = session_keys_fixture()
      update_attrs = %{key_id: "some updated key_id", last_ip: "some updated last_ip", last_login: 43, user_id: 43}

      assert {:ok, %SessionKeys{} = session_keys} = Database.update_session_keys(session_keys, update_attrs)
      assert session_keys.key_id == "some updated key_id"
      assert session_keys.last_ip == "some updated last_ip"
      assert session_keys.last_login == 43
      assert session_keys.user_id == 43
    end

    test "update_session_keys/2 with invalid data returns error changeset" do
      session_keys = session_keys_fixture()
      assert {:error, %Ecto.Changeset{}} = Database.update_session_keys(session_keys, @invalid_attrs)
      assert session_keys == Database.get_session_keys!(session_keys.id)
    end

    test "delete_session_keys/1 deletes the session_keys" do
      session_keys = session_keys_fixture()
      assert {:ok, %SessionKeys{}} = Database.delete_session_keys(session_keys)
      assert_raise Ecto.NoResultsError, fn -> Database.get_session_keys!(session_keys.id) end
    end

    test "change_session_keys/1 returns a session_keys changeset" do
      session_keys = session_keys_fixture()
      assert %Ecto.Changeset{} = Database.change_session_keys(session_keys)
    end
  end

  describe "smiles" do
    alias Api.Database.Smiles

    import Api.DatabaseFixtures

    @invalid_attrs %{code: nil, emoticon: nil, smile_url: nil, smilies_id: nil}

    test "list_smiles/0 returns all smiles" do
      smiles = smiles_fixture()
      assert Database.list_smiles() == [smiles]
    end

    test "get_smiles!/1 returns the smiles with given id" do
      smiles = smiles_fixture()
      assert Database.get_smiles!(smiles.id) == smiles
    end

    test "create_smiles/1 with valid data creates a smiles" do
      valid_attrs = %{code: "some code", emoticon: "some emoticon", smile_url: "some smile_url", smilies_id: 42}

      assert {:ok, %Smiles{} = smiles} = Database.create_smiles(valid_attrs)
      assert smiles.code == "some code"
      assert smiles.emoticon == "some emoticon"
      assert smiles.smile_url == "some smile_url"
      assert smiles.smilies_id == 42
    end

    test "create_smiles/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Database.create_smiles(@invalid_attrs)
    end

    test "update_smiles/2 with valid data updates the smiles" do
      smiles = smiles_fixture()
      update_attrs = %{code: "some updated code", emoticon: "some updated emoticon", smile_url: "some updated smile_url", smilies_id: 43}

      assert {:ok, %Smiles{} = smiles} = Database.update_smiles(smiles, update_attrs)
      assert smiles.code == "some updated code"
      assert smiles.emoticon == "some updated emoticon"
      assert smiles.smile_url == "some updated smile_url"
      assert smiles.smilies_id == 43
    end

    test "update_smiles/2 with invalid data returns error changeset" do
      smiles = smiles_fixture()
      assert {:error, %Ecto.Changeset{}} = Database.update_smiles(smiles, @invalid_attrs)
      assert smiles == Database.get_smiles!(smiles.id)
    end

    test "delete_smiles/1 deletes the smiles" do
      smiles = smiles_fixture()
      assert {:ok, %Smiles{}} = Database.delete_smiles(smiles)
      assert_raise Ecto.NoResultsError, fn -> Database.get_smiles!(smiles.id) end
    end

    test "change_smiles/1 returns a smiles changeset" do
      smiles = smiles_fixture()
      assert %Ecto.Changeset{} = Database.change_smiles(smiles)
    end
  end

  describe "themes" do
    alias Api.Database.Theme

    import Api.DatabaseFixtures

    @invalid_attrs %{tr_color3: nil, body_vlink: nil, img_size_privmsg: nil, td_color1: nil, fontcolor3: nil, body_background: nil, td_class3: nil, template_name: nil, tr_class2: nil, th_class3: nil, tr_color2: nil, tr_class3: nil, tr_class1: nil, fontface2: nil, th_color1: nil, th_class2: nil, themes_id: nil, td_class1: nil, body_text: nil, th_color2: nil, body_link: nil, tr_color1: nil, td_class2: nil, td_color2: nil, fontsize2: nil, fontface3: nil, fontcolor2: nil, body_bgcolor: nil, fontsize3: nil, fontface1: nil, fontcolor1: nil, span_class3: nil, span_class2: nil, th_color3: nil, body_alink: nil, td_color3: nil, fontsize1: nil, head_stylesheet: nil, style_name: nil, th_class1: nil, span_class1: nil, body_hlink: nil, img_size_poll: nil}

    test "list_themes/0 returns all themes" do
      theme = theme_fixture()
      assert Database.list_themes() == [theme]
    end

    test "get_theme!/1 returns the theme with given id" do
      theme = theme_fixture()
      assert Database.get_theme!(theme.id) == theme
    end

    test "create_theme/1 with valid data creates a theme" do
      valid_attrs = %{tr_color3: "some tr_color3", body_vlink: "some body_vlink", img_size_privmsg: 42, td_color1: "some td_color1", fontcolor3: "some fontcolor3", body_background: "some body_background", td_class3: "some td_class3", template_name: "some template_name", tr_class2: "some tr_class2", th_class3: "some th_class3", tr_color2: "some tr_color2", tr_class3: "some tr_class3", tr_class1: "some tr_class1", fontface2: "some fontface2", th_color1: "some th_color1", th_class2: "some th_class2", themes_id: "some themes_id", td_class1: "some td_class1", body_text: "some body_text", th_color2: "some th_color2", body_link: "some body_link", tr_color1: "some tr_color1", td_class2: "some td_class2", td_color2: "some td_color2", fontsize2: 42, fontface3: "some fontface3", fontcolor2: "some fontcolor2", body_bgcolor: "some body_bgcolor", fontsize3: 42, fontface1: "some fontface1", fontcolor1: "some fontcolor1", span_class3: "some span_class3", span_class2: "some span_class2", th_color3: "some th_color3", body_alink: "some body_alink", td_color3: "some td_color3", fontsize1: 42, head_stylesheet: "some head_stylesheet", style_name: "some style_name", th_class1: "some th_class1", span_class1: "some span_class1", body_hlink: "some body_hlink", img_size_poll: 42}

      assert {:ok, %Theme{} = theme} = Database.create_theme(valid_attrs)
      assert theme.img_size_poll == 42
      assert theme.body_hlink == "some body_hlink"
      assert theme.span_class1 == "some span_class1"
      assert theme.th_class1 == "some th_class1"
      assert theme.style_name == "some style_name"
      assert theme.head_stylesheet == "some head_stylesheet"
      assert theme.fontsize1 == 42
      assert theme.td_color3 == "some td_color3"
      assert theme.body_alink == "some body_alink"
      assert theme.th_color3 == "some th_color3"
      assert theme.span_class2 == "some span_class2"
      assert theme.span_class3 == "some span_class3"
      assert theme.fontcolor1 == "some fontcolor1"
      assert theme.fontface1 == "some fontface1"
      assert theme.fontsize3 == 42
      assert theme.body_bgcolor == "some body_bgcolor"
      assert theme.fontcolor2 == "some fontcolor2"
      assert theme.fontface3 == "some fontface3"
      assert theme.fontsize2 == 42
      assert theme.td_color2 == "some td_color2"
      assert theme.td_class2 == "some td_class2"
      assert theme.tr_color1 == "some tr_color1"
      assert theme.body_link == "some body_link"
      assert theme.th_color2 == "some th_color2"
      assert theme.body_text == "some body_text"
      assert theme.td_class1 == "some td_class1"
      assert theme.themes_id == "some themes_id"
      assert theme.th_class2 == "some th_class2"
      assert theme.th_color1 == "some th_color1"
      assert theme.fontface2 == "some fontface2"
      assert theme.tr_class1 == "some tr_class1"
      assert theme.tr_class3 == "some tr_class3"
      assert theme.tr_color2 == "some tr_color2"
      assert theme.th_class3 == "some th_class3"
      assert theme.tr_class2 == "some tr_class2"
      assert theme.template_name == "some template_name"
      assert theme.td_class3 == "some td_class3"
      assert theme.body_background == "some body_background"
      assert theme.fontcolor3 == "some fontcolor3"
      assert theme.td_color1 == "some td_color1"
      assert theme.img_size_privmsg == 42
      assert theme.body_vlink == "some body_vlink"
      assert theme.tr_color3 == "some tr_color3"
    end

    test "create_theme/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Database.create_theme(@invalid_attrs)
    end

    test "update_theme/2 with valid data updates the theme" do
      theme = theme_fixture()
      update_attrs = %{tr_color3: "some updated tr_color3", body_vlink: "some updated body_vlink", img_size_privmsg: 43, td_color1: "some updated td_color1", fontcolor3: "some updated fontcolor3", body_background: "some updated body_background", td_class3: "some updated td_class3", template_name: "some updated template_name", tr_class2: "some updated tr_class2", th_class3: "some updated th_class3", tr_color2: "some updated tr_color2", tr_class3: "some updated tr_class3", tr_class1: "some updated tr_class1", fontface2: "some updated fontface2", th_color1: "some updated th_color1", th_class2: "some updated th_class2", themes_id: "some updated themes_id", td_class1: "some updated td_class1", body_text: "some updated body_text", th_color2: "some updated th_color2", body_link: "some updated body_link", tr_color1: "some updated tr_color1", td_class2: "some updated td_class2", td_color2: "some updated td_color2", fontsize2: 43, fontface3: "some updated fontface3", fontcolor2: "some updated fontcolor2", body_bgcolor: "some updated body_bgcolor", fontsize3: 43, fontface1: "some updated fontface1", fontcolor1: "some updated fontcolor1", span_class3: "some updated span_class3", span_class2: "some updated span_class2", th_color3: "some updated th_color3", body_alink: "some updated body_alink", td_color3: "some updated td_color3", fontsize1: 43, head_stylesheet: "some updated head_stylesheet", style_name: "some updated style_name", th_class1: "some updated th_class1", span_class1: "some updated span_class1", body_hlink: "some updated body_hlink", img_size_poll: 43}

      assert {:ok, %Theme{} = theme} = Database.update_theme(theme, update_attrs)
      assert theme.img_size_poll == 43
      assert theme.body_hlink == "some updated body_hlink"
      assert theme.span_class1 == "some updated span_class1"
      assert theme.th_class1 == "some updated th_class1"
      assert theme.style_name == "some updated style_name"
      assert theme.head_stylesheet == "some updated head_stylesheet"
      assert theme.fontsize1 == 43
      assert theme.td_color3 == "some updated td_color3"
      assert theme.body_alink == "some updated body_alink"
      assert theme.th_color3 == "some updated th_color3"
      assert theme.span_class2 == "some updated span_class2"
      assert theme.span_class3 == "some updated span_class3"
      assert theme.fontcolor1 == "some updated fontcolor1"
      assert theme.fontface1 == "some updated fontface1"
      assert theme.fontsize3 == 43
      assert theme.body_bgcolor == "some updated body_bgcolor"
      assert theme.fontcolor2 == "some updated fontcolor2"
      assert theme.fontface3 == "some updated fontface3"
      assert theme.fontsize2 == 43
      assert theme.td_color2 == "some updated td_color2"
      assert theme.td_class2 == "some updated td_class2"
      assert theme.tr_color1 == "some updated tr_color1"
      assert theme.body_link == "some updated body_link"
      assert theme.th_color2 == "some updated th_color2"
      assert theme.body_text == "some updated body_text"
      assert theme.td_class1 == "some updated td_class1"
      assert theme.themes_id == "some updated themes_id"
      assert theme.th_class2 == "some updated th_class2"
      assert theme.th_color1 == "some updated th_color1"
      assert theme.fontface2 == "some updated fontface2"
      assert theme.tr_class1 == "some updated tr_class1"
      assert theme.tr_class3 == "some updated tr_class3"
      assert theme.tr_color2 == "some updated tr_color2"
      assert theme.th_class3 == "some updated th_class3"
      assert theme.tr_class2 == "some updated tr_class2"
      assert theme.template_name == "some updated template_name"
      assert theme.td_class3 == "some updated td_class3"
      assert theme.body_background == "some updated body_background"
      assert theme.fontcolor3 == "some updated fontcolor3"
      assert theme.td_color1 == "some updated td_color1"
      assert theme.img_size_privmsg == 43
      assert theme.body_vlink == "some updated body_vlink"
      assert theme.tr_color3 == "some updated tr_color3"
    end

    test "update_theme/2 with invalid data returns error changeset" do
      theme = theme_fixture()
      assert {:error, %Ecto.Changeset{}} = Database.update_theme(theme, @invalid_attrs)
      assert theme == Database.get_theme!(theme.id)
    end

    test "delete_theme/1 deletes the theme" do
      theme = theme_fixture()
      assert {:ok, %Theme{}} = Database.delete_theme(theme)
      assert_raise Ecto.NoResultsError, fn -> Database.get_theme!(theme.id) end
    end

    test "change_theme/1 returns a theme changeset" do
      theme = theme_fixture()
      assert %Ecto.Changeset{} = Database.change_theme(theme)
    end
  end

  describe "themes_name" do
    alias Api.Database.ThemeName

    import Api.DatabaseFixtures

    @invalid_attrs %{fontcolor1_name: nil, fontcolor2_name: nil, fontcolor3_name: nil, fontface1_name: nil, fontface2_name: nil, fontface3_name: nil, fontsize1_name: nil, fontsize2_name: nil, fontsize3_name: nil, span_class1_name: nil, span_class2_name: nil, span_class3_name: nil, td_class1_name: nil, td_class2_name: nil, td_class3_name: nil, td_color1_name: nil, td_color2_name: nil, td_color3_name: nil, th_class1_name: nil, th_class2_name: nil, th_class3_name: nil, th_color1_name: nil, th_color2_name: nil, th_color3_name: nil, themes_id: nil, tr_class1_name: nil, tr_class2_name: nil, tr_class3_name: nil, tr_color1_name: nil, tr_color2_name: nil, tr_color3_name: nil}

    test "list_themes_name/0 returns all themes_name" do
      theme_name = theme_name_fixture()
      assert Database.list_themes_name() == [theme_name]
    end

    test "get_theme_name!/1 returns the theme_name with given id" do
      theme_name = theme_name_fixture()
      assert Database.get_theme_name!(theme_name.id) == theme_name
    end

    test "create_theme_name/1 with valid data creates a theme_name" do
      valid_attrs = %{fontcolor1_name: "some fontcolor1_name", fontcolor2_name: "some fontcolor2_name", fontcolor3_name: "some fontcolor3_name", fontface1_name: "some fontface1_name", fontface2_name: "some fontface2_name", fontface3_name: "some fontface3_name", fontsize1_name: "some fontsize1_name", fontsize2_name: "some fontsize2_name", fontsize3_name: "some fontsize3_name", span_class1_name: "some span_class1_name", span_class2_name: "some span_class2_name", span_class3_name: "some span_class3_name", td_class1_name: "some td_class1_name", td_class2_name: "some td_class2_name", td_class3_name: "some td_class3_name", td_color1_name: "some td_color1_name", td_color2_name: "some td_color2_name", td_color3_name: "some td_color3_name", th_class1_name: "some th_class1_name", th_class2_name: "some th_class2_name", th_class3_name: "some th_class3_name", th_color1_name: "some th_color1_name", th_color2_name: "some th_color2_name", th_color3_name: "some th_color3_name", themes_id: 42, tr_class1_name: "some tr_class1_name", tr_class2_name: "some tr_class2_name", tr_class3_name: "some tr_class3_name", tr_color1_name: "some tr_color1_name", tr_color2_name: "some tr_color2_name", tr_color3_name: "some tr_color3_name"}

      assert {:ok, %ThemeName{} = theme_name} = Database.create_theme_name(valid_attrs)
      assert theme_name.fontcolor1_name == "some fontcolor1_name"
      assert theme_name.fontcolor2_name == "some fontcolor2_name"
      assert theme_name.fontcolor3_name == "some fontcolor3_name"
      assert theme_name.fontface1_name == "some fontface1_name"
      assert theme_name.fontface2_name == "some fontface2_name"
      assert theme_name.fontface3_name == "some fontface3_name"
      assert theme_name.fontsize1_name == "some fontsize1_name"
      assert theme_name.fontsize2_name == "some fontsize2_name"
      assert theme_name.fontsize3_name == "some fontsize3_name"
      assert theme_name.span_class1_name == "some span_class1_name"
      assert theme_name.span_class2_name == "some span_class2_name"
      assert theme_name.span_class3_name == "some span_class3_name"
      assert theme_name.td_class1_name == "some td_class1_name"
      assert theme_name.td_class2_name == "some td_class2_name"
      assert theme_name.td_class3_name == "some td_class3_name"
      assert theme_name.td_color1_name == "some td_color1_name"
      assert theme_name.td_color2_name == "some td_color2_name"
      assert theme_name.td_color3_name == "some td_color3_name"
      assert theme_name.th_class1_name == "some th_class1_name"
      assert theme_name.th_class2_name == "some th_class2_name"
      assert theme_name.th_class3_name == "some th_class3_name"
      assert theme_name.th_color1_name == "some th_color1_name"
      assert theme_name.th_color2_name == "some th_color2_name"
      assert theme_name.th_color3_name == "some th_color3_name"
      assert theme_name.themes_id == 42
      assert theme_name.tr_class1_name == "some tr_class1_name"
      assert theme_name.tr_class2_name == "some tr_class2_name"
      assert theme_name.tr_class3_name == "some tr_class3_name"
      assert theme_name.tr_color1_name == "some tr_color1_name"
      assert theme_name.tr_color2_name == "some tr_color2_name"
      assert theme_name.tr_color3_name == "some tr_color3_name"
    end

    test "create_theme_name/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Database.create_theme_name(@invalid_attrs)
    end

    test "update_theme_name/2 with valid data updates the theme_name" do
      theme_name = theme_name_fixture()
      update_attrs = %{fontcolor1_name: "some updated fontcolor1_name", fontcolor2_name: "some updated fontcolor2_name", fontcolor3_name: "some updated fontcolor3_name", fontface1_name: "some updated fontface1_name", fontface2_name: "some updated fontface2_name", fontface3_name: "some updated fontface3_name", fontsize1_name: "some updated fontsize1_name", fontsize2_name: "some updated fontsize2_name", fontsize3_name: "some updated fontsize3_name", span_class1_name: "some updated span_class1_name", span_class2_name: "some updated span_class2_name", span_class3_name: "some updated span_class3_name", td_class1_name: "some updated td_class1_name", td_class2_name: "some updated td_class2_name", td_class3_name: "some updated td_class3_name", td_color1_name: "some updated td_color1_name", td_color2_name: "some updated td_color2_name", td_color3_name: "some updated td_color3_name", th_class1_name: "some updated th_class1_name", th_class2_name: "some updated th_class2_name", th_class3_name: "some updated th_class3_name", th_color1_name: "some updated th_color1_name", th_color2_name: "some updated th_color2_name", th_color3_name: "some updated th_color3_name", themes_id: 43, tr_class1_name: "some updated tr_class1_name", tr_class2_name: "some updated tr_class2_name", tr_class3_name: "some updated tr_class3_name", tr_color1_name: "some updated tr_color1_name", tr_color2_name: "some updated tr_color2_name", tr_color3_name: "some updated tr_color3_name"}

      assert {:ok, %ThemeName{} = theme_name} = Database.update_theme_name(theme_name, update_attrs)
      assert theme_name.fontcolor1_name == "some updated fontcolor1_name"
      assert theme_name.fontcolor2_name == "some updated fontcolor2_name"
      assert theme_name.fontcolor3_name == "some updated fontcolor3_name"
      assert theme_name.fontface1_name == "some updated fontface1_name"
      assert theme_name.fontface2_name == "some updated fontface2_name"
      assert theme_name.fontface3_name == "some updated fontface3_name"
      assert theme_name.fontsize1_name == "some updated fontsize1_name"
      assert theme_name.fontsize2_name == "some updated fontsize2_name"
      assert theme_name.fontsize3_name == "some updated fontsize3_name"
      assert theme_name.span_class1_name == "some updated span_class1_name"
      assert theme_name.span_class2_name == "some updated span_class2_name"
      assert theme_name.span_class3_name == "some updated span_class3_name"
      assert theme_name.td_class1_name == "some updated td_class1_name"
      assert theme_name.td_class2_name == "some updated td_class2_name"
      assert theme_name.td_class3_name == "some updated td_class3_name"
      assert theme_name.td_color1_name == "some updated td_color1_name"
      assert theme_name.td_color2_name == "some updated td_color2_name"
      assert theme_name.td_color3_name == "some updated td_color3_name"
      assert theme_name.th_class1_name == "some updated th_class1_name"
      assert theme_name.th_class2_name == "some updated th_class2_name"
      assert theme_name.th_class3_name == "some updated th_class3_name"
      assert theme_name.th_color1_name == "some updated th_color1_name"
      assert theme_name.th_color2_name == "some updated th_color2_name"
      assert theme_name.th_color3_name == "some updated th_color3_name"
      assert theme_name.themes_id == 43
      assert theme_name.tr_class1_name == "some updated tr_class1_name"
      assert theme_name.tr_class2_name == "some updated tr_class2_name"
      assert theme_name.tr_class3_name == "some updated tr_class3_name"
      assert theme_name.tr_color1_name == "some updated tr_color1_name"
      assert theme_name.tr_color2_name == "some updated tr_color2_name"
      assert theme_name.tr_color3_name == "some updated tr_color3_name"
    end

    test "update_theme_name/2 with invalid data returns error changeset" do
      theme_name = theme_name_fixture()
      assert {:error, %Ecto.Changeset{}} = Database.update_theme_name(theme_name, @invalid_attrs)
      assert theme_name == Database.get_theme_name!(theme_name.id)
    end

    test "delete_theme_name/1 deletes the theme_name" do
      theme_name = theme_name_fixture()
      assert {:ok, %ThemeName{}} = Database.delete_theme_name(theme_name)
      assert_raise Ecto.NoResultsError, fn -> Database.get_theme_name!(theme_name.id) end
    end

    test "change_theme_name/1 returns a theme_name changeset" do
      theme_name = theme_name_fixture()
      assert %Ecto.Changeset{} = Database.change_theme_name(theme_name)
    end
  end

  describe "topics" do
    alias Api.Database.Topic

    import Api.DatabaseFixtures

    @invalid_attrs %{forum_id: nil, topic_first_post_id: nil, topic_id: nil, topic_last_post_id: nil, topic_moved_id: nil, topic_poster: nil, topic_replies: nil, topic_status: nil, topic_time: nil, topic_title: nil, topic_type: nil, topic_views: nil, topic_vote: nil}

    test "list_topics/0 returns all topics" do
      topic = topic_fixture()
      assert Database.list_topics() == [topic]
    end

    test "get_topic!/1 returns the topic with given id" do
      topic = topic_fixture()
      assert Database.get_topic!(topic.id) == topic
    end

    test "create_topic/1 with valid data creates a topic" do
      valid_attrs = %{forum_id: 42, topic_first_post_id: 42, topic_id: 42, topic_last_post_id: 42, topic_moved_id: 42, topic_poster: 42, topic_replies: 42, topic_status: 42, topic_time: 42, topic_title: "some topic_title", topic_type: 42, topic_views: 42, topic_vote: 42}

      assert {:ok, %Topic{} = topic} = Database.create_topic(valid_attrs)
      assert topic.forum_id == 42
      assert topic.topic_first_post_id == 42
      assert topic.topic_id == 42
      assert topic.topic_last_post_id == 42
      assert topic.topic_moved_id == 42
      assert topic.topic_poster == 42
      assert topic.topic_replies == 42
      assert topic.topic_status == 42
      assert topic.topic_time == 42
      assert topic.topic_title == "some topic_title"
      assert topic.topic_type == 42
      assert topic.topic_views == 42
      assert topic.topic_vote == 42
    end

    test "create_topic/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Database.create_topic(@invalid_attrs)
    end

    test "update_topic/2 with valid data updates the topic" do
      topic = topic_fixture()
      update_attrs = %{forum_id: 43, topic_first_post_id: 43, topic_id: 43, topic_last_post_id: 43, topic_moved_id: 43, topic_poster: 43, topic_replies: 43, topic_status: 43, topic_time: 43, topic_title: "some updated topic_title", topic_type: 43, topic_views: 43, topic_vote: 43}

      assert {:ok, %Topic{} = topic} = Database.update_topic(topic, update_attrs)
      assert topic.forum_id == 43
      assert topic.topic_first_post_id == 43
      assert topic.topic_id == 43
      assert topic.topic_last_post_id == 43
      assert topic.topic_moved_id == 43
      assert topic.topic_poster == 43
      assert topic.topic_replies == 43
      assert topic.topic_status == 43
      assert topic.topic_time == 43
      assert topic.topic_title == "some updated topic_title"
      assert topic.topic_type == 43
      assert topic.topic_views == 43
      assert topic.topic_vote == 43
    end

    test "update_topic/2 with invalid data returns error changeset" do
      topic = topic_fixture()
      assert {:error, %Ecto.Changeset{}} = Database.update_topic(topic, @invalid_attrs)
      assert topic == Database.get_topic!(topic.id)
    end

    test "delete_topic/1 deletes the topic" do
      topic = topic_fixture()
      assert {:ok, %Topic{}} = Database.delete_topic(topic)
      assert_raise Ecto.NoResultsError, fn -> Database.get_topic!(topic.id) end
    end

    test "change_topic/1 returns a topic changeset" do
      topic = topic_fixture()
      assert %Ecto.Changeset{} = Database.change_topic(topic)
    end
  end

  describe "topics_watch" do
    alias Api.Database.TopicWatch

    import Api.DatabaseFixtures

    @invalid_attrs %{notify_status: nil, topic_id: nil, user_id: nil}

    test "list_topics_watch/0 returns all topics_watch" do
      topic_watch = topic_watch_fixture()
      assert Database.list_topics_watch() == [topic_watch]
    end

    test "get_topic_watch!/1 returns the topic_watch with given id" do
      topic_watch = topic_watch_fixture()
      assert Database.get_topic_watch!(topic_watch.id) == topic_watch
    end

    test "create_topic_watch/1 with valid data creates a topic_watch" do
      valid_attrs = %{notify_status: 42, topic_id: 42, user_id: 42}

      assert {:ok, %TopicWatch{} = topic_watch} = Database.create_topic_watch(valid_attrs)
      assert topic_watch.notify_status == 42
      assert topic_watch.topic_id == 42
      assert topic_watch.user_id == 42
    end

    test "create_topic_watch/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Database.create_topic_watch(@invalid_attrs)
    end

    test "update_topic_watch/2 with valid data updates the topic_watch" do
      topic_watch = topic_watch_fixture()
      update_attrs = %{notify_status: 43, topic_id: 43, user_id: 43}

      assert {:ok, %TopicWatch{} = topic_watch} = Database.update_topic_watch(topic_watch, update_attrs)
      assert topic_watch.notify_status == 43
      assert topic_watch.topic_id == 43
      assert topic_watch.user_id == 43
    end

    test "update_topic_watch/2 with invalid data returns error changeset" do
      topic_watch = topic_watch_fixture()
      assert {:error, %Ecto.Changeset{}} = Database.update_topic_watch(topic_watch, @invalid_attrs)
      assert topic_watch == Database.get_topic_watch!(topic_watch.id)
    end

    test "delete_topic_watch/1 deletes the topic_watch" do
      topic_watch = topic_watch_fixture()
      assert {:ok, %TopicWatch{}} = Database.delete_topic_watch(topic_watch)
      assert_raise Ecto.NoResultsError, fn -> Database.get_topic_watch!(topic_watch.id) end
    end

    test "change_topic_watch/1 returns a topic_watch changeset" do
      topic_watch = topic_watch_fixture()
      assert %Ecto.Changeset{} = Database.change_topic_watch(topic_watch)
    end
  end

  describe "user_group" do
    alias Api.Database.UserGroup

    import Api.DatabaseFixtures

    @invalid_attrs %{group_id: nil, user_id: nil, user_pending: nil}

    test "list_user_group/0 returns all user_group" do
      user_group = user_group_fixture()
      assert Database.list_user_group() == [user_group]
    end

    test "get_user_group!/1 returns the user_group with given id" do
      user_group = user_group_fixture()
      assert Database.get_user_group!(user_group.id) == user_group
    end

    test "create_user_group/1 with valid data creates a user_group" do
      valid_attrs = %{group_id: 42, user_id: 42, user_pending: 42}

      assert {:ok, %UserGroup{} = user_group} = Database.create_user_group(valid_attrs)
      assert user_group.group_id == 42
      assert user_group.user_id == 42
      assert user_group.user_pending == 42
    end

    test "create_user_group/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Database.create_user_group(@invalid_attrs)
    end

    test "update_user_group/2 with valid data updates the user_group" do
      user_group = user_group_fixture()
      update_attrs = %{group_id: 43, user_id: 43, user_pending: 43}

      assert {:ok, %UserGroup{} = user_group} = Database.update_user_group(user_group, update_attrs)
      assert user_group.group_id == 43
      assert user_group.user_id == 43
      assert user_group.user_pending == 43
    end

    test "update_user_group/2 with invalid data returns error changeset" do
      user_group = user_group_fixture()
      assert {:error, %Ecto.Changeset{}} = Database.update_user_group(user_group, @invalid_attrs)
      assert user_group == Database.get_user_group!(user_group.id)
    end

    test "delete_user_group/1 deletes the user_group" do
      user_group = user_group_fixture()
      assert {:ok, %UserGroup{}} = Database.delete_user_group(user_group)
      assert_raise Ecto.NoResultsError, fn -> Database.get_user_group!(user_group.id) end
    end

    test "change_user_group/1 returns a user_group changeset" do
      user_group = user_group_fixture()
      assert %Ecto.Changeset{} = Database.change_user_group(user_group)
    end
  end

  describe "users" do
    alias Api.Database.User

    import Api.DatabaseFixtures

    @invalid_attrs %{user_login_tries: nil, user_timezone: nil, user_allowhtml: nil, user_posts: nil, user_occ: nil, user_allow_pm: nil, user_allowsmile: nil, user_interests: nil, user_website: nil, user_session_time: nil, user_emailtime: nil, user_avatar: nil, user_sig_bbcode_uid: nil, user_viewemail: nil, user_sig: nil, user_allowbbcode: nil, user_last_login_try: nil, user_aim: nil, user_lang: nil, user_allowavatar: nil, user_new_privmsg: nil, user_allow_viewonline: nil, user_from: nil, user_msnm: nil, user_id: nil, user_active: nil, user_attachsig: nil, user_avatar_type: nil, user_actkey: nil, user_level: nil, username: nil, user_regdate: nil, user_last_privmsg: nil, user_email: nil, user_unread_privmsg: nil, user_style: nil, user_session_page: nil, user_newpasswd: nil, user_password: nil, user_lastvisit: nil, user_popup_pm: nil, user_rank: nil, user_dateformat: nil, user_icq: nil, user_notify_pm: nil, user_notify: nil, user_yim: nil}

    test "list_users/0 returns all users" do
      user = user_fixture()
      assert Database.list_users() == [user]
    end

    test "get_user!/1 returns the user with given id" do
      user = user_fixture()
      assert Database.get_user!(user.id) == user
    end

    test "create_user/1 with valid data creates a user" do
      valid_attrs = %{user_login_tries: 42, user_timezone: "some user_timezone", user_allowhtml: 42, user_posts: 42, user_occ: "some user_occ", user_allow_pm: 42, user_allowsmile: 42, user_interests: "some user_interests", user_website: "some user_website", user_session_time: 42, user_emailtime: 42, user_avatar: "some user_avatar", user_sig_bbcode_uid: "some user_sig_bbcode_uid", user_viewemail: 42, user_sig: "some user_sig", user_allowbbcode: 42, user_last_login_try: 42, user_aim: "some user_aim", user_lang: "some user_lang", user_allowavatar: 42, user_new_privmsg: 42, user_allow_viewonline: 42, user_from: "some user_from", user_msnm: "some user_msnm", user_id: 42, user_active: 42, user_attachsig: 42, user_avatar_type: 42, user_actkey: "some user_actkey", user_level: 42, username: "some username", user_regdate: 42, user_last_privmsg: 42, user_email: "some user_email", user_unread_privmsg: 42, user_style: 42, user_session_page: 42, user_newpasswd: "some user_newpasswd", user_password: "some user_password", user_lastvisit: 42, user_popup_pm: 42, user_rank: 42, user_dateformat: "some user_dateformat", user_icq: "some user_icq", user_notify_pm: 42, user_notify: 42, user_yim: "some user_yim"}

      assert {:ok, %User{} = user} = Database.create_user(valid_attrs)
      assert user.user_yim == "some user_yim"
      assert user.user_notify == 42
      assert user.user_notify_pm == 42
      assert user.user_icq == "some user_icq"
      assert user.user_dateformat == "some user_dateformat"
      assert user.user_rank == 42
      assert user.user_popup_pm == 42
      assert user.user_lastvisit == 42
      assert user.user_password == "some user_password"
      assert user.user_newpasswd == "some user_newpasswd"
      assert user.user_session_page == 42
      assert user.user_style == 42
      assert user.user_unread_privmsg == 42
      assert user.user_email == "some user_email"
      assert user.user_last_privmsg == 42
      assert user.user_regdate == 42
      assert user.username == "some username"
      assert user.user_level == 42
      assert user.user_actkey == "some user_actkey"
      assert user.user_avatar_type == 42
      assert user.user_attachsig == 42
      assert user.user_active == 42
      assert user.user_id == 42
      assert user.user_msnm == "some user_msnm"
      assert user.user_from == "some user_from"
      assert user.user_allow_viewonline == 42
      assert user.user_new_privmsg == 42
      assert user.user_allowavatar == 42
      assert user.user_lang == "some user_lang"
      assert user.user_aim == "some user_aim"
      assert user.user_last_login_try == 42
      assert user.user_allowbbcode == 42
      assert user.user_sig == "some user_sig"
      assert user.user_viewemail == 42
      assert user.user_sig_bbcode_uid == "some user_sig_bbcode_uid"
      assert user.user_avatar == "some user_avatar"
      assert user.user_emailtime == 42
      assert user.user_session_time == 42
      assert user.user_website == "some user_website"
      assert user.user_interests == "some user_interests"
      assert user.user_allowsmile == 42
      assert user.user_allow_pm == 42
      assert user.user_occ == "some user_occ"
      assert user.user_posts == 42
      assert user.user_allowhtml == 42
      assert user.user_timezone == "some user_timezone"
      assert user.user_login_tries == 42
    end

    test "create_user/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Database.create_user(@invalid_attrs)
    end

    test "update_user/2 with valid data updates the user" do
      user = user_fixture()
      update_attrs = %{user_login_tries: 43, user_timezone: "some updated user_timezone", user_allowhtml: 43, user_posts: 43, user_occ: "some updated user_occ", user_allow_pm: 43, user_allowsmile: 43, user_interests: "some updated user_interests", user_website: "some updated user_website", user_session_time: 43, user_emailtime: 43, user_avatar: "some updated user_avatar", user_sig_bbcode_uid: "some updated user_sig_bbcode_uid", user_viewemail: 43, user_sig: "some updated user_sig", user_allowbbcode: 43, user_last_login_try: 43, user_aim: "some updated user_aim", user_lang: "some updated user_lang", user_allowavatar: 43, user_new_privmsg: 43, user_allow_viewonline: 43, user_from: "some updated user_from", user_msnm: "some updated user_msnm", user_id: 43, user_active: 43, user_attachsig: 43, user_avatar_type: 43, user_actkey: "some updated user_actkey", user_level: 43, username: "some updated username", user_regdate: 43, user_last_privmsg: 43, user_email: "some updated user_email", user_unread_privmsg: 43, user_style: 43, user_session_page: 43, user_newpasswd: "some updated user_newpasswd", user_password: "some updated user_password", user_lastvisit: 43, user_popup_pm: 43, user_rank: 43, user_dateformat: "some updated user_dateformat", user_icq: "some updated user_icq", user_notify_pm: 43, user_notify: 43, user_yim: "some updated user_yim"}

      assert {:ok, %User{} = user} = Database.update_user(user, update_attrs)
      assert user.user_yim == "some updated user_yim"
      assert user.user_notify == 43
      assert user.user_notify_pm == 43
      assert user.user_icq == "some updated user_icq"
      assert user.user_dateformat == "some updated user_dateformat"
      assert user.user_rank == 43
      assert user.user_popup_pm == 43
      assert user.user_lastvisit == 43
      assert user.user_password == "some updated user_password"
      assert user.user_newpasswd == "some updated user_newpasswd"
      assert user.user_session_page == 43
      assert user.user_style == 43
      assert user.user_unread_privmsg == 43
      assert user.user_email == "some updated user_email"
      assert user.user_last_privmsg == 43
      assert user.user_regdate == 43
      assert user.username == "some updated username"
      assert user.user_level == 43
      assert user.user_actkey == "some updated user_actkey"
      assert user.user_avatar_type == 43
      assert user.user_attachsig == 43
      assert user.user_active == 43
      assert user.user_id == 43
      assert user.user_msnm == "some updated user_msnm"
      assert user.user_from == "some updated user_from"
      assert user.user_allow_viewonline == 43
      assert user.user_new_privmsg == 43
      assert user.user_allowavatar == 43
      assert user.user_lang == "some updated user_lang"
      assert user.user_aim == "some updated user_aim"
      assert user.user_last_login_try == 43
      assert user.user_allowbbcode == 43
      assert user.user_sig == "some updated user_sig"
      assert user.user_viewemail == 43
      assert user.user_sig_bbcode_uid == "some updated user_sig_bbcode_uid"
      assert user.user_avatar == "some updated user_avatar"
      assert user.user_emailtime == 43
      assert user.user_session_time == 43
      assert user.user_website == "some updated user_website"
      assert user.user_interests == "some updated user_interests"
      assert user.user_allowsmile == 43
      assert user.user_allow_pm == 43
      assert user.user_occ == "some updated user_occ"
      assert user.user_posts == 43
      assert user.user_allowhtml == 43
      assert user.user_timezone == "some updated user_timezone"
      assert user.user_login_tries == 43
    end

    test "update_user/2 with invalid data returns error changeset" do
      user = user_fixture()
      assert {:error, %Ecto.Changeset{}} = Database.update_user(user, @invalid_attrs)
      assert user == Database.get_user!(user.id)
    end

    test "delete_user/1 deletes the user" do
      user = user_fixture()
      assert {:ok, %User{}} = Database.delete_user(user)
      assert_raise Ecto.NoResultsError, fn -> Database.get_user!(user.id) end
    end

    test "change_user/1 returns a user changeset" do
      user = user_fixture()
      assert %Ecto.Changeset{} = Database.change_user(user)
    end
  end

  describe "vote_desc" do
    alias Api.Database.VoteDesc

    import Api.DatabaseFixtures

    @invalid_attrs %{topic_id: nil, vote_id: nil, vote_length: nil, vote_start: nil, vote_text: nil}

    test "list_vote_desc/0 returns all vote_desc" do
      vote_desc = vote_desc_fixture()
      assert Database.list_vote_desc() == [vote_desc]
    end

    test "get_vote_desc!/1 returns the vote_desc with given id" do
      vote_desc = vote_desc_fixture()
      assert Database.get_vote_desc!(vote_desc.id) == vote_desc
    end

    test "create_vote_desc/1 with valid data creates a vote_desc" do
      valid_attrs = %{topic_id: 42, vote_id: 42, vote_length: 42, vote_start: 42, vote_text: 42}

      assert {:ok, %VoteDesc{} = vote_desc} = Database.create_vote_desc(valid_attrs)
      assert vote_desc.topic_id == 42
      assert vote_desc.vote_id == 42
      assert vote_desc.vote_length == 42
      assert vote_desc.vote_start == 42
      assert vote_desc.vote_text == 42
    end

    test "create_vote_desc/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Database.create_vote_desc(@invalid_attrs)
    end

    test "update_vote_desc/2 with valid data updates the vote_desc" do
      vote_desc = vote_desc_fixture()
      update_attrs = %{topic_id: 43, vote_id: 43, vote_length: 43, vote_start: 43, vote_text: 43}

      assert {:ok, %VoteDesc{} = vote_desc} = Database.update_vote_desc(vote_desc, update_attrs)
      assert vote_desc.topic_id == 43
      assert vote_desc.vote_id == 43
      assert vote_desc.vote_length == 43
      assert vote_desc.vote_start == 43
      assert vote_desc.vote_text == 43
    end

    test "update_vote_desc/2 with invalid data returns error changeset" do
      vote_desc = vote_desc_fixture()
      assert {:error, %Ecto.Changeset{}} = Database.update_vote_desc(vote_desc, @invalid_attrs)
      assert vote_desc == Database.get_vote_desc!(vote_desc.id)
    end

    test "delete_vote_desc/1 deletes the vote_desc" do
      vote_desc = vote_desc_fixture()
      assert {:ok, %VoteDesc{}} = Database.delete_vote_desc(vote_desc)
      assert_raise Ecto.NoResultsError, fn -> Database.get_vote_desc!(vote_desc.id) end
    end

    test "change_vote_desc/1 returns a vote_desc changeset" do
      vote_desc = vote_desc_fixture()
      assert %Ecto.Changeset{} = Database.change_vote_desc(vote_desc)
    end
  end

  describe "vote_results" do
    alias Api.Database.VoteResult

    import Api.DatabaseFixtures

    @invalid_attrs %{vote_id: nil, vote_option_id: nil, vote_option_text: nil, vote_result: nil}

    test "list_vote_results/0 returns all vote_results" do
      vote_result = vote_result_fixture()
      assert Database.list_vote_results() == [vote_result]
    end

    test "get_vote_result!/1 returns the vote_result with given id" do
      vote_result = vote_result_fixture()
      assert Database.get_vote_result!(vote_result.id) == vote_result
    end

    test "create_vote_result/1 with valid data creates a vote_result" do
      valid_attrs = %{vote_id: 42, vote_option_id: 42, vote_option_text: "some vote_option_text", vote_result: 42}

      assert {:ok, %VoteResult{} = vote_result} = Database.create_vote_result(valid_attrs)
      assert vote_result.vote_id == 42
      assert vote_result.vote_option_id == 42
      assert vote_result.vote_option_text == "some vote_option_text"
      assert vote_result.vote_result == 42
    end

    test "create_vote_result/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Database.create_vote_result(@invalid_attrs)
    end

    test "update_vote_result/2 with valid data updates the vote_result" do
      vote_result = vote_result_fixture()
      update_attrs = %{vote_id: 43, vote_option_id: 43, vote_option_text: "some updated vote_option_text", vote_result: 43}

      assert {:ok, %VoteResult{} = vote_result} = Database.update_vote_result(vote_result, update_attrs)
      assert vote_result.vote_id == 43
      assert vote_result.vote_option_id == 43
      assert vote_result.vote_option_text == "some updated vote_option_text"
      assert vote_result.vote_result == 43
    end

    test "update_vote_result/2 with invalid data returns error changeset" do
      vote_result = vote_result_fixture()
      assert {:error, %Ecto.Changeset{}} = Database.update_vote_result(vote_result, @invalid_attrs)
      assert vote_result == Database.get_vote_result!(vote_result.id)
    end

    test "delete_vote_result/1 deletes the vote_result" do
      vote_result = vote_result_fixture()
      assert {:ok, %VoteResult{}} = Database.delete_vote_result(vote_result)
      assert_raise Ecto.NoResultsError, fn -> Database.get_vote_result!(vote_result.id) end
    end

    test "change_vote_result/1 returns a vote_result changeset" do
      vote_result = vote_result_fixture()
      assert %Ecto.Changeset{} = Database.change_vote_result(vote_result)
    end
  end

  describe "vote_voters" do
    alias Api.Database.VoteVoter

    import Api.DatabaseFixtures

    @invalid_attrs %{vote_id: nil, vote_user_id: nil, vote_user_ip: nil}

    test "list_vote_voters/0 returns all vote_voters" do
      vote_voter = vote_voter_fixture()
      assert Database.list_vote_voters() == [vote_voter]
    end

    test "get_vote_voter!/1 returns the vote_voter with given id" do
      vote_voter = vote_voter_fixture()
      assert Database.get_vote_voter!(vote_voter.id) == vote_voter
    end

    test "create_vote_voter/1 with valid data creates a vote_voter" do
      valid_attrs = %{vote_id: 42, vote_user_id: 42, vote_user_ip: "some vote_user_ip"}

      assert {:ok, %VoteVoter{} = vote_voter} = Database.create_vote_voter(valid_attrs)
      assert vote_voter.vote_id == 42
      assert vote_voter.vote_user_id == 42
      assert vote_voter.vote_user_ip == "some vote_user_ip"
    end

    test "create_vote_voter/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Database.create_vote_voter(@invalid_attrs)
    end

    test "update_vote_voter/2 with valid data updates the vote_voter" do
      vote_voter = vote_voter_fixture()
      update_attrs = %{vote_id: 43, vote_user_id: 43, vote_user_ip: "some updated vote_user_ip"}

      assert {:ok, %VoteVoter{} = vote_voter} = Database.update_vote_voter(vote_voter, update_attrs)
      assert vote_voter.vote_id == 43
      assert vote_voter.vote_user_id == 43
      assert vote_voter.vote_user_ip == "some updated vote_user_ip"
    end

    test "update_vote_voter/2 with invalid data returns error changeset" do
      vote_voter = vote_voter_fixture()
      assert {:error, %Ecto.Changeset{}} = Database.update_vote_voter(vote_voter, @invalid_attrs)
      assert vote_voter == Database.get_vote_voter!(vote_voter.id)
    end

    test "delete_vote_voter/1 deletes the vote_voter" do
      vote_voter = vote_voter_fixture()
      assert {:ok, %VoteVoter{}} = Database.delete_vote_voter(vote_voter)
      assert_raise Ecto.NoResultsError, fn -> Database.get_vote_voter!(vote_voter.id) end
    end

    test "change_vote_voter/1 returns a vote_voter changeset" do
      vote_voter = vote_voter_fixture()
      assert %Ecto.Changeset{} = Database.change_vote_voter(vote_voter)
    end
  end

  describe "words" do
    alias Api.Database.Word

    import Api.DatabaseFixtures

    @invalid_attrs %{replacement: nil, word: nil, word_id: nil}

    test "list_words/0 returns all words" do
      word = word_fixture()
      assert Database.list_words() == [word]
    end

    test "get_word!/1 returns the word with given id" do
      word = word_fixture()
      assert Database.get_word!(word.id) == word
    end

    test "create_word/1 with valid data creates a word" do
      valid_attrs = %{replacement: "some replacement", word: "some word", word_id: 42}

      assert {:ok, %Word{} = word} = Database.create_word(valid_attrs)
      assert word.replacement == "some replacement"
      assert word.word == "some word"
      assert word.word_id == 42
    end

    test "create_word/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Database.create_word(@invalid_attrs)
    end

    test "update_word/2 with valid data updates the word" do
      word = word_fixture()
      update_attrs = %{replacement: "some updated replacement", word: "some updated word", word_id: 43}

      assert {:ok, %Word{} = word} = Database.update_word(word, update_attrs)
      assert word.replacement == "some updated replacement"
      assert word.word == "some updated word"
      assert word.word_id == 43
    end

    test "update_word/2 with invalid data returns error changeset" do
      word = word_fixture()
      assert {:error, %Ecto.Changeset{}} = Database.update_word(word, @invalid_attrs)
      assert word == Database.get_word!(word.id)
    end

    test "delete_word/1 deletes the word" do
      word = word_fixture()
      assert {:ok, %Word{}} = Database.delete_word(word)
      assert_raise Ecto.NoResultsError, fn -> Database.get_word!(word.id) end
    end

    test "change_word/1 returns a word changeset" do
      word = word_fixture()
      assert %Ecto.Changeset{} = Database.change_word(word)
    end
  end
end
