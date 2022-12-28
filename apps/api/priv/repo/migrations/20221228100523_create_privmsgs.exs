defmodule Api.Repo.Migrations.CreatePrivmsgs do
  use Ecto.Migration

  def change do
    create table(:privmsgs) do
      add :privmsgs_id, :integer
      add :privmsgs_type, :integer
      add :privmsgs_subject, :string
      add :privmsgs_from_userid, :integer
      add :privmsgs_to_userid, :integer
      add :privmsgs_date, :integer
      add :privmsgs_ip, :string
      add :privmsgs_enable_bbcode, :integer
      add :privmsgs_enable_html, :integer
      add :privmsgs_enable_smilies, :integer
      add :privmsgs_attach_sig, :integer

      timestamps()
    end
  end
end
