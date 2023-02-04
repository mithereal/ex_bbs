defmodule Mipha.Repo.Migrations.CreateLocations do
  use Ecto.Migration

  def change do
    create table(:bbs_locations) do
      add(:name, :string)

      timestamps()
    end
  end
end
