defmodule Api.Repo.Migrations.CreateTopicsWatch do
  use Ecto.Migration

  def change do
    create table(:topics_watch) do
      add :topic_id, :integer
      add :user_id, :integer
      add :notify_status, :integer

      timestamps()
    end
  end
end
