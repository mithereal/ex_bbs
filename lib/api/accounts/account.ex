defmodule Api.Accounts.Account do
  use Api.Schema
  import Ecto.Changeset

  schema "bbs_accounts" do
    field(:email, :string)

    has_one(:admin_user, Api.Accounts.User)
    has_many(:users, Api.Accounts.User)

    timestamps()
  end

  @doc false
  def changeset(account, attrs) do
    account
    |> cast(attrs, [:email])
    |> validate_required([:email])
  end
end
