defmodule Api.Database.User do
  use Ecto.Schema
  import Ecto.Changeset

  schema "users" do
    field :user_yim, :string
    field :user_notify, :integer
    field :user_notify_pm, :integer
    field :user_icq, :string
    field :user_dateformat, :string
    field :user_rank, :integer
    field :user_popup_pm, :integer
    field :user_lastvisit, :integer
    field :user_password, :string
    field :user_newpasswd, :string
    field :user_session_page, :integer
    field :user_style, :integer
    field :user_unread_privmsg, :integer
    field :user_email, :string
    field :user_last_privmsg, :integer
    field :user_regdate, :integer
    field :username, :string
    field :user_level, :integer
    field :user_actkey, :string
    field :user_avatar_type, :integer
    field :user_attachsig, :integer
    field :user_active, :integer
    field :user_id, :integer
    field :user_msnm, :string
    field :user_from, :string
    field :user_allow_viewonline, :integer
    field :user_new_privmsg, :integer
    field :user_allowavatar, :integer
    field :user_lang, :string
    field :user_aim, :string
    field :user_last_login_try, :integer
    field :user_allowbbcode, :integer
    field :user_sig, :string
    field :user_viewemail, :integer
    field :user_sig_bbcode_uid, :string
    field :user_avatar, :string
    field :user_emailtime, :integer
    field :user_session_time, :integer
    field :user_website, :string
    field :user_interests, :string
    field :user_allowsmile, :integer
    field :user_allow_pm, :integer
    field :user_occ, :string
    field :user_posts, :integer
    field :user_allowhtml, :integer
    field :user_timezone, :string
    field :user_login_tries, :integer

    timestamps()
  end

  @doc false
  def changeset(user, attrs) do
    user
    |> cast(attrs, [:user_id, :user_active, :username, :user_regdate, :user_password, :user_session_time, :user_session_page, :user_lastvisit, :user_email, :user_icq, :user_website, :user_occ, :user_from, :user_interests, :user_sig, :user_sig_bbcode_uid, :user_style, :user_aim, :user_yim, :user_msnm, :user_posts, :user_new_privmsg, :user_unread_privmsg, :user_last_privmsg, :user_login_tries, :user_last_login_try, :user_emailtime, :user_viewemail, :user_attachsig, :user_allowhtml, :user_allowbbcode, :user_allowsmile, :user_allow_pm, :user_allowavatar, :user_allow_viewonline, :user_rank, :user_avatar, :user_avatar_type, :user_level, :user_lang, :user_timezone, :user_dateformat, :user_notify_pm, :user_popup_pm, :user_notify, :user_actkey, :user_newpasswd])
    |> validate_required([:user_id, :user_active, :username, :user_regdate, :user_password, :user_session_time, :user_session_page, :user_lastvisit, :user_email, :user_icq, :user_website, :user_occ, :user_from, :user_interests, :user_sig, :user_sig_bbcode_uid, :user_style, :user_aim, :user_yim, :user_msnm, :user_posts, :user_new_privmsg, :user_unread_privmsg, :user_last_privmsg, :user_login_tries, :user_last_login_try, :user_emailtime, :user_viewemail, :user_attachsig, :user_allowhtml, :user_allowbbcode, :user_allowsmile, :user_allow_pm, :user_allowavatar, :user_allow_viewonline, :user_rank, :user_avatar, :user_avatar_type, :user_level, :user_lang, :user_timezone, :user_dateformat, :user_notify_pm, :user_popup_pm, :user_notify, :user_actkey, :user_newpasswd])
  end
end
