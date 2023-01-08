defmodule Api.Repo.Migrations.CreateConfig do
  use Ecto.Migration

  def change do
    create table(:config) do
      add :config_name, :string
      add :config_value, :string

      timestamps()
    end
  end
end
