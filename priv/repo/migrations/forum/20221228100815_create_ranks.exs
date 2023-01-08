defmodule Api.Repo.Migrations.CreateRanks do
  use Ecto.Migration

  def change do
    create table(:ranks) do
      add :rank_id, :integer
      add :rank_title, :string
      add :rank_min, :integer
      add :rank_special, :integer
      add :rank_image, :string

      timestamps()
    end
  end
end
