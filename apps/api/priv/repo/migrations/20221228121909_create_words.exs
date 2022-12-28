defmodule Api.Repo.Migrations.CreateWords do
  use Ecto.Migration

  def change do
    create table(:words) do
      add :word_id, :integer
      add :word, :string
      add :replacement, :string

      timestamps()
    end
  end
end
