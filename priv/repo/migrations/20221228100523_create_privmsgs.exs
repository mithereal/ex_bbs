defmodule Api.Repo.Migrations.CreatePrivmsgs do
  use Ecto.Migration

  def change do
    create table(:bbs_privmsgs) do
      add :type, :integer
      add :subject, :string
      add :date, :integer
      add :body, :string

      add(:from_user_id, references(:bbs_users, on_delete: :nothing))
      add(:to_user_id, references(:bbs_users, on_delete: :nothing))

      timestamps()
    end
  end
end
