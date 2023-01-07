defmodule Api.Accounts.User.Profile do
  use Ecto.Schema

  import Ecto.Changeset

  alias Api.Accounts.User
  alias Api.Accounts.User.Profile

  @moduledoc false

  @params ~w( name phone phone_alt address mailing_address city state zip image about)a
  @required_fields ~w(  )a

  schema "user_profiles" do
    field(:name, :string)
    field(:phone, :string)
    field(:email, :string)
    field(:phone_alt, :string)
    field(:address, :string)
    field(:mailing_address, :string)
    field(:city, :string)
    field(:state, :string)
    field(:zip, :string)
    field(:image, :string)
    field(:about, :string)

    belongs_to(:user, User)

    timestamps()
  end

  @doc false
  def changeset(struct \\ %Profile{}, params \\ %{}) do
    struct
    |> cast(params, @params)
    |> validate_required(@required_fields)
  end
end
