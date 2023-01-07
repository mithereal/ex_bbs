defmodule Api.Repo.Migrations.CreateImages do
  use Ecto.Migration

  def change do
    create table(:images) do
      add :path, :string
      add :size, :string
      add :name, :string
      add :type, :string
      add :width, :float
      add :height, :float

      add :product_id, references(:products, on_delete: :nothing)

      timestamps()
    end

    alter table(:products) do
      add :main_image_id, references(:images, on_delete: :nothing)
      add :images, references(:images, on_delete: :nothing)
    end
  end
end
