defmodule Api.Repo.Migrations.CreateImages do
  use Ecto.Migration

  def change do
    create table(:bbs_images) do
      add :path, :string
      add :size, :string
      add :description, :string
      add :type, :string
      add :width, :float
      add :height, :float

      timestamps()
    end
  end


  alter table(:bbs_images) do
    add :user_id, references(:bbs_users, on_delete: :nothing)
  end
end
