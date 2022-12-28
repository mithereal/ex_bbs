defmodule Api.Repo.Migrations.CreateVoteDesc do
  use Ecto.Migration

  def change do
    create table(:vote_desc) do
      add :vote_id, :integer
      add :topic_id, :integer
      add :vote_text, :integer
      add :vote_start, :integer
      add :vote_length, :integer

      timestamps()
    end
  end
end
