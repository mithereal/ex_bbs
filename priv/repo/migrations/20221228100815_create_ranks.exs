defmodule Api.Repo.Migrations.CreateRanks do
  use Ecto.Migration

  def change do
    create table(:bbs_ranks) do
      add :id, :uuid, primary_key: true, null: false
      add :title, :string
      add :image, :string

      timestamps()
    end
  end
end
