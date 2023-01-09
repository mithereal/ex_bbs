defmodule Api.Repo.Migrations.CreateSmiles do
  use Ecto.Migration

  def change do
    create table(:bbs_smiles,primary_key: false) do
      add :uuid, :uuid, primary_key: true
      add :code, :string
      add :smile_url, :string
      add :emoticon, :string

      timestamps()
    end
  end
end
