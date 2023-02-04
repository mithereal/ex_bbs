defmodule Mipha.Repo.Migrations.CreateCompanies do
  use Ecto.Migration

  def change do
    create table(:bbs_companies) do
      add(:name, :string)
      add(:avatar, :string)
      add(:location_id, :integer)

      timestamps()
    end
  end
end
