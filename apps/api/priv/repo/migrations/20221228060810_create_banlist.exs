defmodule Api.Repo.Migrations.CreateBanlist do
  use Ecto.Migration

  def change do
    create table(:banlist) do
      add(:ban_id, :integer, null: false)
      add(:ban_userid, :integer, null: false)
      add(:ban_ip, :string, null: false, default: 1)
      add(:ban_email, :string, null: false)

      timestamps()
    end

    create(unique_index(:banlist, :ban_id))
  end
end
