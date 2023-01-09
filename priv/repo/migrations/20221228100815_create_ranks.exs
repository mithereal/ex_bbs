defmodule Api.Repo.Migrations.CreateRanks do
  use Ecto.Migration

  def change do
    create table(:bbs_ranks,primary_key: false) do
      add :uuid, :uuid, primary_key: true
      add :title, :string
      add :image, :string

      timestamps()
    end
  end
end
