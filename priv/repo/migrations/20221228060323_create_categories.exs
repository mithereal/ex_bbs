defmodule Api.Repo.Migrations.CreateCategories do
  use Ecto.Migration

  def change do
    create table(:bbs_categories) do
      add :title, :string
      add :description, :string
      add :order, :integer

      timestamps()
    end
  end
end
