defmodule Api.Repo.Migrations.Confirm do
  use Ecto.Migration

  def change do
    create table(:confirm) do
      add(:confirm_id, :integer, null: false, default: "")
      add(:session_id, :integer, null: false, default: "")
      add(:code, :integer, null: false, default: "")

      timestamps()
    end

    create(unique_index(:confirm, [:session_id, :confirm_id]))
  end
end
