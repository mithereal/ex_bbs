defmodule Api.Repo.Migrations.CreateUsers do
  use Ecto.Migration

  def change do
    create table(:users) do
      add :user_id, :integer
      add :user_active, :integer
      add :username, :string
      add :user_regdate, :integer
      add :user_password, :string
      add :user_session_time, :integer
      add :user_session_page, :integer
      add :user_lastvisit, :integer
      add :user_email, :string
      add :user_icq, :string
      add :user_website, :string
      add :user_occ, :string
      add :user_from, :string
      add :user_interests, :string
      add :user_sig, :string
      add :user_sig_bbcode_uid, :string
      add :user_style, :integer
      add :user_aim, :string
      add :user_yim, :string
      add :user_msnm, :string
      add :user_posts, :integer
      add :user_new_privmsg, :integer
      add :user_unread_privmsg, :integer
      add :user_last_privmsg, :integer
      add :user_login_tries, :integer
      add :user_last_login_try, :integer
      add :user_emailtime, :integer
      add :user_viewemail, :integer
      add :user_attachsig, :integer
      add :user_allowhtml, :integer
      add :user_allowbbcode, :integer
      add :user_allowsmile, :integer
      add :user_allow_pm, :integer
      add :user_allowavatar, :integer
      add :user_allow_viewonline, :integer
      add :user_rank, :integer
      add :user_avatar, :string
      add :user_avatar_type, :integer
      add :user_level, :integer
      add :user_lang, :string
      add :user_timezone, :string
      add :user_dateformat, :string
      add :user_notify_pm, :integer
      add :user_popup_pm, :integer
      add :user_notify, :integer
      add :user_actkey, :string
      add :user_newpasswd, :string

      timestamps()
    end
  end
end
