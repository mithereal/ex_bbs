defmodule Api.Repo.Migrations.CreateVoteResults do
  use Ecto.Migration

  def change do
    create table(:vote_results) do
      add :vote_id, :integer
      add :vote_option_id, :integer
      add :vote_option_text, :string
      add :vote_result, :integer

      timestamps()
    end
  end
end
