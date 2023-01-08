defmodule Api.Repo.Migrations.CreateSearchWordmatch do
  use Ecto.Migration

  def change do
    create table(:search_wordmatch) do
      add :post_id, :integer
      add :word_id, :integer
      add :title_match, :integer

      timestamps()
    end
  end
end
