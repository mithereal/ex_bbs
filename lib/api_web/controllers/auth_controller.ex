defmodule ApiWeb.AuthController do
  @moduledoc """
  Auth controller responsible for handling Ueberauth responses
  """

  use ApiWeb, :controller

  plug Ueberauth

  alias Ueberauth.Strategy.Helpers
  alias Api.Accounts, as: Accounts
  alias Api.Accounts.User
  alias ApiWeb.UserAuth

  require Logger

  def request(conn, _params) do
    render(conn, "request.html", callback_url: Helpers.callback_url(conn))
  end

  def delete(conn, _params) do
    conn
    |> put_flash(:info, "You have been logged out!")
    |> UserAuth.log_out_user()
  end

  def callback(%{assigns: %{ueberauth_failure: error}} = conn, _params) do
    error = List.first(error.errors)

    conn
    |> put_flash(:error, "Failed to authenticate. #{error.message}")
    |> redirect(to: "/")
  end

  def callback(%{assigns: %{ueberauth_auth: auth}} = conn, _params) do
    case Accounts.find_or_create(auth) do
      {:ok, user} ->
        conn =
          conn
          |> put_flash(:info, "Successfully authenticated.")
          |> UserAuth.log_in_user(user, %{token: auth.credentials.token})

      {:error, reason} ->
        conn
        |> put_flash(:error, reason)
        |> redirect(to: "/")
    end
  end
end
