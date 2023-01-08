defmodule Api.Repo.Migrations.CreateCategories do
  use Ecto.Migration

  def change do
    create table(:bbs_categories) do
      add :id, :uuid, primary_key: true, null: false
      add :title, :string
      add :description, :string
      add :order, :integer

      timestamps()
    end
  end
end
