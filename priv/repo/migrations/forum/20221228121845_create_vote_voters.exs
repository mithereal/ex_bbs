defmodule Api.Repo.Migrations.CreateVoteVoters do
  use Ecto.Migration

  def change do
    create table(:vote_voters) do
      add :vote_id, :integer
      add :vote_user_id, :integer
      add :vote_user_ip, :string

      timestamps()
    end
  end
end
