defmodule Api.Repo.Migrations.CreateDisallow do
  use Ecto.Migration

  def change do
    create table(:disallow) do
      add :disallow_id, :integer
      add :disallow_username, :string

      timestamps()
    end
  end
end
