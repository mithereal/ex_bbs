defmodule Api.Repo.Migrations.CreateSearchWordlist do
  use Ecto.Migration

  def change do
    create table(:search_wordlist) do
      add :word_id, :integer
      add :word_text, :string
      add :word_common, :string

      timestamps()
    end
  end
end
