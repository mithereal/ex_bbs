defmodule Api.Repo.Migrations.CreateConfirm do
  use Ecto.Migration

  def change do
    create table(:confirm) do
      add :confirm_id, :integer
      add :session_id, :integer
      add :code, :integer

      timestamps()
    end
  end
end
