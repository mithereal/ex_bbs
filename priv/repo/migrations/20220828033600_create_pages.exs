defmodule Api.Repo.Migrations.CreatePages do
  use Ecto.Migration

  def change do
    create table(:bbs_pages) do
      add :name, :string
      add :data, :string

      timestamps()
    end
  end
end
