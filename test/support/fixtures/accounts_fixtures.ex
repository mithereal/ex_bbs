defmodule Api.AccountsFixtures do
  @moduledoc """
  This module defines test helpers for creating
  entities via the `Api.Accounts` context.
  """

  def unique_user_email, do: "user#{System.unique_integer()}@example.com"
  def valid_user_password, do: "hello world!"

  def user_fixture(attrs \\ %{}) do
    {:ok, data} =
      attrs
      |> Enum.into(%{
        email: unique_user_email(),
        password: valid_user_password(),
        password_confirmation: valid_user_password(),
        terms: "on"
      })
      |> Api.Accounts.register_user()

    data
  end

  def admin_fixture(attrs \\ %{}) do
    {:ok, user} =
      attrs
      |> Enum.into(%{
        email: unique_user_email(),
        password: valid_user_password(),
        password_confirmation: valid_user_password(),
        terms: "on"
      })
      |> Api.Accounts.register_admin()

    user
  end

  def extract_user_token(fun) do
    {:ok, captured} = fun.(&"[TOKEN]#{&1}[TOKEN]")
    [_, token, _] = String.split(captured.body, "[TOKEN]")
    token
  end

  @doc """
  Generate a account.
  """
  def account_fixture(attrs \\ %{}) do
    {:ok, account} =
      attrs
      |> Enum.into(%{
        email: unique_user_email(),
        password: valid_user_password(),
        password_confirmation: valid_user_password(),
        terms: "on"
      })
      |> Api.Accounts.create_account()

    account
  end
end
