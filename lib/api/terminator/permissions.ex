defmodule Api.Terminator.Permissions do
  @moduledoc """
  The Permission context for Terminator.
  """
  import Ecto.Query, warn: false
  alias Api.Repo


  @profile_abilities [
    "view_profiles",
    "view_memberslist",
    "view_online",
    "change_username",
    "change_password",
    "change_email",
    "change_avatar",
    "change_default_usergroup",
    "change_field_information"
  ]

  @pm_abilities [
    "send_message",
    "send_messages",
    "send_message_groups",
    "read_messages",
    "edit_own_messages",
    "remove_own_messages_from_folder",
    "forward_message",
    "email_message",
    "print_message",
    "attach_files_to_message",
    "download_files_from_message",
    "use_bbcode_in_message",
    "use_smilies_in_message",
    "use_img_bbcode_in_message",
    "use_flash_bbcode_in_message"
  ]

  @misc_abilities [
    "send_email",
    "send_message",
    "ignore_flood_limit",
    "hide_online_status",
    "view_hidden_online_users",
    "search_board",
    "manage_styles",
    "manage_extensions",
    "view_logs",
    "clear_logs",
    "manage_modules",
    "manage_language_packs",
    "send_mass_email",
    "manage_bots",
    "manage_bans",
    "manage_report/denial_reasons",
    "backup/restore_database",
    "manage_search_backends_and_settings",
    "manage_pages_extension",
    "issue_warnings",
    "close_and_delete_reports_of_private_messages"
  ]

  @settings_abilities [
    "alter_board_settings/check_for_updates",
    "alter_server/communication_settings",
    "alter_jabber_settings",
    "view_system_settings"
  ]

  @form_abilities [
    "manage_forums",
    "add_new_forums",
    "delete_forums",
    "prune_forums"
  ]

  @posting_abilities [
    "alter_topic/post_icons_and_smilies",
    "alter_word_censors",
    "define_bbcode_tags",
    "alter_attachment_related_settings"
  ]

  @user_and_groups_abilities [
    "manage_users",
    "delete/prune_users",
    "manage_groups",
    "add_new_groups",
    "delete_groups",
    "manage_ranks",
    "manage_custom_profile_fields",
    "manage_disallowed_names",
    "manage_bans"
  ]

  @permissions_abilities [
    "view_permission_masks",
    "alter_permissions_for_individual_groups",
    "alter_permissions_for_individual_users",
    "alter_forum_permission_class",
    "alter_moderator_permission_class",
    "alter_admin_permission_class",
    "alter_user_permission_class",
    "use_others_permissions"
  ]

  @actions_abilities [
    "see_forum",
    "see_topics",
    "read_forum",
    "search_the_forum",
    "subscribe_forum",
    "print_topics",
    "email_topics",
    "bump_topics",
    "lock_own_topics",
    "download_files",
    "report_posts"
  ]

  @post_abilities [
    "start_new_topics",
    "post_stickies",
    "post_announcements",
    "post_global_announcements",
    "reply_to_topics",
    "edit_own_posts",
    "permanently_delete_own_posts",
    "soft_delete_own_posts",
    "ignore_flood_limit",
    "increment_post_counter",
    "post_without_approval",
    "edit_posts",
    "add_post",
    "permanently_delete_posts",
    "approve_and_restore_posts",
    "close_and_delete_reports",
    "change_post_author",
    "view_post_details",
    "soft_delete_posts",
    "add_attachment",
    "download_file",
    "save_draft",
    "disable_word_censors",
    "use_signature",
    "use_emoji_and_rtf_characters"
  ]

  @content_abilities [
    "attach_files",
    "topic_icons",
    "use_bbcode",
    "use_bbcode_flash",
    "use_bbcode_img",
    "use_signatures",
    "use_smiles"
  ]

  @polls_abilities [
    "create_polls",
    "vote_in_polls",
    "change_existing_vote"
  ]

  @topic_abilities [
    "move_topic",
    "lock_topic",
    "split_topic",
    "merge_topic",
    "edit_topic",
    "delete_topic",
    "add_topic",
    "approve_topic",
    "deny_topic"
  ]

  @system_abilities [
    "delete_account",
    "add_account",
    "edit_account",
    "ban_account",
    "system_maintenance"
  ]

  @user_abilities [
    "add_post"
  ]

  @default_abilities @system_abilities ++
                       @topic_abilities ++
                       @polls_abilities ++
                       @content_abilities ++
                       @post_abilities ++
                       @actions_abilities ++
                       @permissions_abilities ++
                       @user_and_groups_abilities ++
                       @posting_abilities ++
                       @form_abilities ++
                       @settings_abilities ++
                       @misc_abilities ++ @pm_abilities ++ @profile_abilities

  @default_roles [
    "standard_admin",
    "forum_admin",
    "full_admin",
    "user_and_groups_admin",
    "user",
    "moderator",
    "forum"
  ]


  def default_roles() do
    roles = Application.get_env(:api, :default_roles, @default_roles)

    roles =
      Enum.map(roles, fn x ->
        title =
          String.split(x, "_")
          |> Enum.map(fn x -> String.capitalize(x) end)
          |> Enum.join(" ")

        Terminator.UUID.Role.build(x, [], title)
        |> Terminator.UUID.Repo.insert()
      end)

    all_abilities = Api.Repo.all(Terminator.UUID.Ability)

    admin = Terminator.UUID.Repo.get_by(Terminator.UUID.Role, identifier: "full_admin")
    user = Terminator.UUID.Repo.get_by(Terminator.UUID.Role, identifier: "user")

    for ability <- all_abilities do
      Terminator.UUID.Role.grant(admin, ability)
    end

    for ability <- @user_abilities do
      ability = Terminator.UUID.Repo.get_by(Terminator.UUID.Ability, identifier: ability)
      Terminator.UUID.Role.grant(user, ability)
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

      Terminator.UUID.Ability.build(x, title)
      |> Terminator.UUID.Repo.insert()
    end)
  end
end
