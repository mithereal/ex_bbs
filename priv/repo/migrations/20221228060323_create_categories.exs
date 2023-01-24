defmodule Api.Repo.Migrations.CreateCategories do
  use Ecto.Migration

  def change do
    create table(:bbs_categories, primary_key: false) do
      add :id, :uuid, primary_key: true
      add :title, :string
      add :description, :string
      add :order, :integer
      add :status, :integer

      timestamps()
    end
  end
end
