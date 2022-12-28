defmodule Api.Repo.Migrations.CreatePrivmsgsText do
  use Ecto.Migration

  def change do
    create table(:privmsgs_text) do
      add :privmsgs_text_id, :integer
      add :privmsgs_bbcode_uid, :string
      add :privmsgs_text, :string

      timestamps()
    end
  end
end
