defmodule Api.Repo.Migrations.CreatePrivmsgs do
  use Ecto.Migration

  def change do
    create table(:bbs_privmsgs,primary_key: false) do
      add :id, :uuid, primary_key: true
      add :type, :integer
      add :subject, :string
      add :date, :integer
      add :body, :string

      add(:from_user_id, references(:bbs_users, on_delete: :nothing, type: :uuid))
      add(:to_user_id, references(:bbs_users, on_delete: :nothing, type: :uuid))

      timestamps()
    end
  end
end
