defmodule Api.Repo.Migrations.CreateBanlist do
  use Ecto.Migration

  def change do
    create table(:banlist) do
      add :group_id, :integer
      add :group_name, :string
      add :group_type, :integer
      add :group_description, :string
      add :group_moderator, :integer
      add :group_single_user, :integer

      timestamps()
    end
  end
end
