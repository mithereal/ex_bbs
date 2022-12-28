defmodule Api.DatabaseFixtures do
  @moduledoc """
  This module defines test helpers for creating
  entities via the `Api.Database` context.
  """

  @doc """
  Generate a category.
  """
  def category_fixture(attrs \\ %{}) do
    {:ok, category} =
      attrs
      |> Enum.into(%{
        cat_id: 42,
        cat_order: 42,
        cat_title: "some cat_title"
      })
      |> Api.Database.create_category()

    category
  end

  @doc """
  Generate a banlist.
  """
  def banlist_fixture(attrs \\ %{}) do
    {:ok, banlist} =
      attrs
      |> Enum.into(%{
        group_description: "some group_description",
        group_id: 42,
        group_moderator: 42,
        group_name: "some group_name",
        group_single_user: 42,
        group_type: 42
      })
      |> Api.Database.create_banlist()

    banlist
  end

  @doc """
  Generate a groups.
  """
  def groups_fixture(attrs \\ %{}) do
    {:ok, groups} =
      attrs
      |> Enum.into(%{
        group_description: "some group_description",
        group_id: 42,
        group_moderator: 42,
        group_name: "some group_name",
        group_single_user: 42,
        group_type: 42
      })
      |> Api.Database.create_groups()

    groups
  end

  @doc """
  Generate a group.
  """
  def group_fixture(attrs \\ %{}) do
    {:ok, group} =
      attrs
      |> Enum.into(%{
        group_description: "some group_description",
        group_id: 42,
        group_moderator: 42,
        group_name: "some group_name",
        group_single_user: 42,
        group_type: 42
      })
      |> Api.Database.create_group()

    group
  end

  @doc """
  Generate a confirm.
  """
  def confirm_fixture(attrs \\ %{}) do
    {:ok, confirm} =
      attrs
      |> Enum.into(%{
        code: 42,
        confirm_id: 42,
        session_id: 42
      })
      |> Api.Database.create_confirm()

    confirm
  end

  @doc """
  Generate a auth_access.
  """
  def auth_access_fixture(attrs \\ %{}) do
    {:ok, auth_access} =
      attrs
      |> Enum.into(%{
        auth_post: 42,
        auth_read: 42,
        auth_reply: 42,
        auth_view: 42,
        forum_id: 42,
        group_id: 42
      })
      |> Api.Database.create_auth_access()

    auth_access
  end

  @doc """
  Generate a config.
  """
  def config_fixture(attrs \\ %{}) do
    {:ok, config} =
      attrs
      |> Enum.into(%{
        config_name: "some config_name",
        config_value: "some config_value"
      })
      |> Api.Database.create_config()

    config
  end

  @doc """
  Generate a disallow.
  """
  def disallow_fixture(attrs \\ %{}) do
    {:ok, disallow} =
      attrs
      |> Enum.into(%{
        disallow_id: 42,
        disallow_username: "some disallow_username"
      })
      |> Api.Database.create_disallow()

    disallow
  end

  @doc """
  Generate a forum.
  """
  def forum_fixture(attrs \\ %{}) do
    {:ok, forum} =
      attrs
      |> Enum.into(%{
        auth_announce: 42,
        auth_attachments: 42,
        auth_delete: 42,
        auth_edit: 42,
        auth_pollcreate: 42,
        auth_post: 42,
        auth_read: 42,
        auth_reply: 42,
        auth_sticky: 42,
        auth_view: 42,
        auth_vote: 42,
        cat_id: 42,
        forum_desc: "some forum_desc",
        forum_id: 42,
        forum_last_post_id: 42,
        forum_name: "some forum_name",
        forum_order: 42,
        forum_posts: 42,
        forum_status: 42,
        forum_topics: 42,
        prune_enable: 42,
        prune_next: 42
      })
      |> Api.Database.create_forum()

    forum
  end

  @doc """
  Generate a forum_prune.
  """
  def forum_prune_fixture(attrs \\ %{}) do
    {:ok, forum_prune} =
      attrs
      |> Enum.into(%{
        forum_id: 42,
        prune_days: 42,
        prune_freq: 42,
        prune_id: 42
      })
      |> Api.Database.create_forum_prune()

    forum_prune
  end

  @doc """
  Generate a post.
  """
  def post_fixture(attrs \\ %{}) do
    {:ok, post} =
      attrs
      |> Enum.into(%{
        enable_bbcode: 42,
        enable_html: 42,
        enable_sig: 42,
        enable_smilies: 42,
        forum_id: 42,
        post_edit_count: 42,
        post_edit_time: 42,
        post_id: 42,
        post_time: 42,
        post_username: "some post_username",
        poster_id: 42,
        poster_ip: "some poster_ip",
        topic_id: 42
      })
      |> Api.Database.create_post()

    post
  end

  @doc """
  Generate a post_text.
  """
  def post_text_fixture(attrs \\ %{}) do
    {:ok, post_text} =
      attrs
      |> Enum.into(%{
        bbcode_uid: "some bbcode_uid",
        post_id: 42,
        post_subject: "some post_subject",
        post_text: "some post_text"
      })
      |> Api.Database.create_post_text()

    post_text
  end

  @doc """
  Generate a priv_msg.
  """
  def priv_msg_fixture(attrs \\ %{}) do
    {:ok, priv_msg} =
      attrs
      |> Enum.into(%{
        privmsgs_attach_sig: 42,
        privmsgs_date: 42,
        privmsgs_enable_bbcode: 42,
        privmsgs_enable_html: 42,
        privmsgs_enable_smilies: 42,
        privmsgs_from_userid: 42,
        privmsgs_id: 42,
        privmsgs_ip: "some privmsgs_ip",
        privmsgs_subject: "some privmsgs_subject",
        privmsgs_to_userid: 42,
        privmsgs_type: 42
      })
      |> Api.Database.create_priv_msg()

    priv_msg
  end

  @doc """
  Generate a priv_msg_text.
  """
  def priv_msg_text_fixture(attrs \\ %{}) do
    {:ok, priv_msg_text} =
      attrs
      |> Enum.into(%{
        privmsgs_bbcode_uid: "some privmsgs_bbcode_uid",
        privmsgs_text: "some privmsgs_text",
        privmsgs_text_id: 42
      })
      |> Api.Database.create_priv_msg_text()

    priv_msg_text
  end

  @doc """
  Generate a rank.
  """
  def rank_fixture(attrs \\ %{}) do
    {:ok, rank} =
      attrs
      |> Enum.into(%{
        rank_id: 42,
        rank_image: "some rank_image",
        rank_min: 42,
        rank_special: 42,
        rank_title: "some rank_title"
      })
      |> Api.Database.create_rank()

    rank
  end

  @doc """
  Generate a search_result.
  """
  def search_result_fixture(attrs \\ %{}) do
    {:ok, search_result} =
      attrs
      |> Enum.into(%{
        search_array: "some search_array",
        search_id: 42,
        search_time: 42,
        session_id: 42
      })
      |> Api.Database.create_search_result()

    search_result
  end

  @doc """
  Generate a search_wordlist.
  """
  def search_wordlist_fixture(attrs \\ %{}) do
    {:ok, search_wordlist} =
      attrs
      |> Enum.into(%{
        word_common: "some word_common",
        word_id: 42,
        word_text: "some word_text"
      })
      |> Api.Database.create_search_wordlist()

    search_wordlist
  end

  @doc """
  Generate a search_wordmatch.
  """
  def search_wordmatch_fixture(attrs \\ %{}) do
    {:ok, search_wordmatch} =
      attrs
      |> Enum.into(%{
        post_id: 42,
        title_match: 42,
        word_id: 42
      })
      |> Api.Database.create_search_wordmatch()

    search_wordmatch
  end

  @doc """
  Generate a session.
  """
  def session_fixture(attrs \\ %{}) do
    {:ok, session} =
      attrs
      |> Enum.into(%{
        session_admin: 42,
        session_id: "some session_id",
        session_ip: "some session_ip",
        session_logged_in: 42,
        session_page: 42,
        session_start: 42,
        session_time: 42,
        session_user_id: 42
      })
      |> Api.Database.create_session()

    session
  end

  @doc """
  Generate a session_keys.
  """
  def session_keys_fixture(attrs \\ %{}) do
    {:ok, session_keys} =
      attrs
      |> Enum.into(%{
        key_id: "some key_id",
        last_ip: "some last_ip",
        last_login: 42,
        user_id: 42
      })
      |> Api.Database.create_session_keys()

    session_keys
  end

  @doc """
  Generate a smiles.
  """
  def smiles_fixture(attrs \\ %{}) do
    {:ok, smiles} =
      attrs
      |> Enum.into(%{
        code: "some code",
        emoticon: "some emoticon",
        smile_url: "some smile_url",
        smilies_id: 42
      })
      |> Api.Database.create_smiles()

    smiles
  end

  @doc """
  Generate a theme.
  """
  def theme_fixture(attrs \\ %{}) do
    {:ok, theme} =
      attrs
      |> Enum.into(%{
        img_size_poll: 42,
        body_hlink: "some body_hlink",
        span_class1: "some span_class1",
        th_class1: "some th_class1",
        style_name: "some style_name",
        head_stylesheet: "some head_stylesheet",
        fontsize1: 42,
        td_color3: "some td_color3",
        body_alink: "some body_alink",
        th_color3: "some th_color3",
        span_class2: "some span_class2",
        span_class3: "some span_class3",
        fontcolor1: "some fontcolor1",
        fontface1: "some fontface1",
        fontsize3: 42,
        body_bgcolor: "some body_bgcolor",
        fontcolor2: "some fontcolor2",
        fontface3: "some fontface3",
        fontsize2: 42,
        td_color2: "some td_color2",
        td_class2: "some td_class2",
        tr_color1: "some tr_color1",
        body_link: "some body_link",
        th_color2: "some th_color2",
        body_text: "some body_text",
        td_class1: "some td_class1",
        themes_id: "some themes_id",
        th_class2: "some th_class2",
        th_color1: "some th_color1",
        fontface2: "some fontface2",
        tr_class1: "some tr_class1",
        tr_class3: "some tr_class3",
        tr_color2: "some tr_color2",
        th_class3: "some th_class3",
        tr_class2: "some tr_class2",
        template_name: "some template_name",
        td_class3: "some td_class3",
        body_background: "some body_background",
        fontcolor3: "some fontcolor3",
        td_color1: "some td_color1",
        img_size_privmsg: 42,
        body_vlink: "some body_vlink",
        tr_color3: "some tr_color3"
      })
      |> Api.Database.create_theme()

    theme
  end

  @doc """
  Generate a theme_name.
  """
  def theme_name_fixture(attrs \\ %{}) do
    {:ok, theme_name} =
      attrs
      |> Enum.into(%{
        fontcolor1_name: "some fontcolor1_name",
        fontcolor2_name: "some fontcolor2_name",
        fontcolor3_name: "some fontcolor3_name",
        fontface1_name: "some fontface1_name",
        fontface2_name: "some fontface2_name",
        fontface3_name: "some fontface3_name",
        fontsize1_name: "some fontsize1_name",
        fontsize2_name: "some fontsize2_name",
        fontsize3_name: "some fontsize3_name",
        span_class1_name: "some span_class1_name",
        span_class2_name: "some span_class2_name",
        span_class3_name: "some span_class3_name",
        td_class1_name: "some td_class1_name",
        td_class2_name: "some td_class2_name",
        td_class3_name: "some td_class3_name",
        td_color1_name: "some td_color1_name",
        td_color2_name: "some td_color2_name",
        td_color3_name: "some td_color3_name",
        th_class1_name: "some th_class1_name",
        th_class2_name: "some th_class2_name",
        th_class3_name: "some th_class3_name",
        th_color1_name: "some th_color1_name",
        th_color2_name: "some th_color2_name",
        th_color3_name: "some th_color3_name",
        themes_id: 42,
        tr_class1_name: "some tr_class1_name",
        tr_class2_name: "some tr_class2_name",
        tr_class3_name: "some tr_class3_name",
        tr_color1_name: "some tr_color1_name",
        tr_color2_name: "some tr_color2_name",
        tr_color3_name: "some tr_color3_name"
      })
      |> Api.Database.create_theme_name()

    theme_name
  end

  @doc """
  Generate a topic.
  """
  def topic_fixture(attrs \\ %{}) do
    {:ok, topic} =
      attrs
      |> Enum.into(%{
        forum_id: 42,
        topic_first_post_id: 42,
        topic_id: 42,
        topic_last_post_id: 42,
        topic_moved_id: 42,
        topic_poster: 42,
        topic_replies: 42,
        topic_status: 42,
        topic_time: 42,
        topic_title: "some topic_title",
        topic_type: 42,
        topic_views: 42,
        topic_vote: 42
      })
      |> Api.Database.create_topic()

    topic
  end

  @doc """
  Generate a topic_watch.
  """
  def topic_watch_fixture(attrs \\ %{}) do
    {:ok, topic_watch} =
      attrs
      |> Enum.into(%{
        notify_status: 42,
        topic_id: 42,
        user_id: 42
      })
      |> Api.Database.create_topic_watch()

    topic_watch
  end

  @doc """
  Generate a user_group.
  """
  def user_group_fixture(attrs \\ %{}) do
    {:ok, user_group} =
      attrs
      |> Enum.into(%{
        group_id: 42,
        user_id: 42,
        user_pending: 42
      })
      |> Api.Database.create_user_group()

    user_group
  end

  @doc """
  Generate a user.
  """
  def user_fixture(attrs \\ %{}) do
    {:ok, user} =
      attrs
      |> Enum.into(%{
        user_yim: "some user_yim",
        user_notify: 42,
        user_notify_pm: 42,
        user_icq: "some user_icq",
        user_dateformat: "some user_dateformat",
        user_rank: 42,
        user_popup_pm: 42,
        user_lastvisit: 42,
        user_password: "some user_password",
        user_newpasswd: "some user_newpasswd",
        user_session_page: 42,
        user_style: 42,
        user_unread_privmsg: 42,
        user_email: "some user_email",
        user_last_privmsg: 42,
        user_regdate: 42,
        username: "some username",
        user_level: 42,
        user_actkey: "some user_actkey",
        user_avatar_type: 42,
        user_attachsig: 42,
        user_active: 42,
        user_id: 42,
        user_msnm: "some user_msnm",
        user_from: "some user_from",
        user_allow_viewonline: 42,
        user_new_privmsg: 42,
        user_allowavatar: 42,
        user_lang: "some user_lang",
        user_aim: "some user_aim",
        user_last_login_try: 42,
        user_allowbbcode: 42,
        user_sig: "some user_sig",
        user_viewemail: 42,
        user_sig_bbcode_uid: "some user_sig_bbcode_uid",
        user_avatar: "some user_avatar",
        user_emailtime: 42,
        user_session_time: 42,
        user_website: "some user_website",
        user_interests: "some user_interests",
        user_allowsmile: 42,
        user_allow_pm: 42,
        user_occ: "some user_occ",
        user_posts: 42,
        user_allowhtml: 42,
        user_timezone: "some user_timezone",
        user_login_tries: 42
      })
      |> Api.Database.create_user()

    user
  end

  @doc """
  Generate a vote_desc.
  """
  def vote_desc_fixture(attrs \\ %{}) do
    {:ok, vote_desc} =
      attrs
      |> Enum.into(%{
        topic_id: 42,
        vote_id: 42,
        vote_length: 42,
        vote_start: 42,
        vote_text: 42
      })
      |> Api.Database.create_vote_desc()

    vote_desc
  end

  @doc """
  Generate a vote_result.
  """
  def vote_result_fixture(attrs \\ %{}) do
    {:ok, vote_result} =
      attrs
      |> Enum.into(%{
        vote_id: 42,
        vote_option_id: 42,
        vote_option_text: "some vote_option_text",
        vote_result: 42
      })
      |> Api.Database.create_vote_result()

    vote_result
  end

  @doc """
  Generate a vote_voter.
  """
  def vote_voter_fixture(attrs \\ %{}) do
    {:ok, vote_voter} =
      attrs
      |> Enum.into(%{
        vote_id: 42,
        vote_user_id: 42,
        vote_user_ip: "some vote_user_ip"
      })
      |> Api.Database.create_vote_voter()

    vote_voter
  end

  @doc """
  Generate a word.
  """
  def word_fixture(attrs \\ %{}) do
    {:ok, word} =
      attrs
      |> Enum.into(%{
        replacement: "some replacement",
        word: "some word",
        word_id: 42
      })
      |> Api.Database.create_word()

    word
  end
end
