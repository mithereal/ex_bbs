defmodule Api.Certs do
  use Api.Schema

  alias Api.Repo
  alias Api.Certs

  schema "bbs_certs" do
    field :cert_pem_string, :string
    field :cacerts_pem_string, :string
    field :key_pem_string, :string
    field :domain, :string

    timestamps()
  end

  def sni_fun(domain) do
    domain = List.to_string(domain)
    {cert_pem_string, cacerts_pem_string, key_pem_string} = get_certs(domain)

    cert = read_pem(cert_pem_string) |> hd() |> elem(1)
    cacerts = read_pem(cacerts_pem_string) |> Enum.map(&elem(&1, 1))
    key = read_pem(key_pem_string) |> hd()

    [cert: cert, cacerts: cacerts, key: key]
  end

  defp read_pem(pem_string) do
    pem_string
    |> :public_key.pem_decode()
    |> Enum.map(fn entry ->
      entry = :public_key.pem_entry_decode(entry)
      type = elem(entry, 0)
      {type, :public_key.der_encode(type, entry)}
    end)
  end

  def get_certs(domain) do
    Repo.get_by(Certs, domain: domain)
  end
end
