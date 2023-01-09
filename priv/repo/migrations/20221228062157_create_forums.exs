defmodule Api.Repo.Migrations.CreateForums do
  use Ecto.Migration

  def change do
    create table(:bbs_forums,primary_key: false) do
      add :uuid, :uuid, primary_key: true
      add :title, :string
      add :description, :string
      add :status, :integer
      add :order, :integer

      add(:user_id, references(:bbs_users, on_delete: :nothing))
      add(:category_id, references(:bbs_categories, on_delete: :nothing))

      timestamps()
    end
  end

end
