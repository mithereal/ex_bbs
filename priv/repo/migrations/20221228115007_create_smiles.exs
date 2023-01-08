defmodule Api.Repo.Migrations.CreateSmiles do
  use Ecto.Migration

  def change do
    create table(:bbs_smiles) do
      add :id, :uuid, primary_key: true, null: false
      add :code, :string
      add :smile_url, :string
      add :emoticon, :string

      timestamps()
    end
  end
end
