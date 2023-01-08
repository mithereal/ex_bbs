defmodule Api.Repo.Migrations.CreateSearchResults do
  use Ecto.Migration

  def change do
    create table(:search_results) do
      add :search_id, :integer
      add :session_id, :integer
      add :search_time, :integer
      add :search_array, :string

      timestamps()
    end
  end
end
