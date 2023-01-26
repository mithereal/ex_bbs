defmodule Api.Repo.Migrations.CreateCerts do
  use Ecto.Migration

  def change do
    create table(:bbs_certs, primary_key: false) do
      add :id, :uuid, primary_key: true
      add :domain, :string
      add :cert_pem_string, :string
      add :cacerts_pem_string, :string
      add :key_pem_string, :string

      timestamps()
    end
  end
end
