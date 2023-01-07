defmodule Api.Repo.Migrations.CreateImages do
  use Ecto.Migration

  def change do
    create table(:images) do
      add :path, :string
      add :size, :string
      add :description, :string
      add :type, :string
      add :width, :float
      add :height, :float

      timestamps()
    end
  end
end
