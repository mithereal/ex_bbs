defmodule Api.Repo.Migrations.CreateSmiles do
  use Ecto.Migration

  def change do
    create table(:smiles) do
      add :smilies_id, :integer
      add :code, :string
      add :smile_url, :string
      add :emoticon, :string

      timestamps()
    end
  end
end
