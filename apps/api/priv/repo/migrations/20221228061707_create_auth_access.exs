defmodule Api.Repo.Migrations.CreateAuthAccess do
  use Ecto.Migration

  def change do
    create table(:auth_access) do
      add :group_id, :integer
      add :forum_id, :integer
      add :auth_view, :integer
      add :auth_read, :integer
      add :auth_post, :integer
      add :auth_reply, :integer

      timestamps()
    end
  end
end
