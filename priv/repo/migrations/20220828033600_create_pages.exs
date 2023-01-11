defmodule Api.Repo.Migrations.CreatePages do
  use Ecto.Migration

  def change do
    create table(:bbs_pages) do
      add :title, :string
      add :content, :string

      timestamps()
    end
  end
end
