defmodule Api.Repo.Migrations.CreateCategories do
  use Ecto.Migration

  def change do
    create table(:categories) do
      add :cat_id, :integer, primary_key: true
      add :cat_title, :string
      add :cat_order, :integer

      timestamps()
    end
  end
end
