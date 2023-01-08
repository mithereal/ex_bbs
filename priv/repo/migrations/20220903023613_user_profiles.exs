defmodule Database.Repo.Migrations.CreateUserProfiles do
  use Ecto.Migration

  def change do
    create table(:bbs_user_profiles) do
      add(:name, :string)
      add(:email, :string)
      add(:phone, :string)
      add(:phone_alt, :string)
      add(:address, :string)
      add(:city, :string)
      add(:state, :string)
      add(:zip, :string)
      add(:image, :string)
      add(:about, :string)

      timestamps()
    end

    alter table(:bbs_user_profiles) do
      add(:user_id, references(:bbs_users, on_delete: :nothing))
    end
  end

  def down do
    execute("DROP user_profiles")
  end
end
