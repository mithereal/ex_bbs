defmodule Api.Repo.Migrations.CreateUserGroup do
  use Ecto.Migration

  def change do
    create table(:user_group) do
      add :group_id, :integer
      add :user_id, :integer
      add :user_pending, :integer

      timestamps()
    end
  end
end
