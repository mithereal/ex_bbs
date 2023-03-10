defmodule ApiWeb.UserRegistrationController do
  use ApiWeb, :controller

  alias Api.Accounts
  alias Api.Accounts.User
  alias ApiWeb.UserAuth



  def new(conn, _params) do

    changeset = Accounts.change_user_registration(%User{})
    render(conn, "new.html", changeset: changeset)
  end

  def create(conn, %{"user" => user_params}) do
    terms = Map.has_key?(user_params, "terms")
    user_params = Map.put(user_params, "terms", terms)

    case Accounts.register_user(user_params) do
      {:ok, user} ->
        Accounts.create_account(user)

        {:ok, _} =
          Accounts.deliver_user_confirmation_instructions(
            user,
            &Routes.user_confirmation_url(conn, :confirm, &1),
            Application.get_env(:api, :mode, :debug)
          )

        conn
        |> put_flash(:info, "User created successfully.")
        |> UserAuth.log_in_user(user)

      {:error, %Ecto.Changeset{} = changeset} ->
        render(conn, "new.html", changeset: changeset)
    end
  end
end
