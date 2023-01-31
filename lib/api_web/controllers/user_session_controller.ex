defmodule ApiWeb.UserSessionController do
  use ApiWeb, :controller

  alias Api.Accounts
  alias ApiWeb.UserAuth

  def new(conn, _params) do
    render(conn, "new.html", error_message: nil)
  end

  def create(conn, %{"user" => user_params, "_captcha" => captcha}) do
    # Validation captcha.
    is_true_captcha =
      conn
      |> get_session(:excaptcha)
      |> String.equivalent?(captcha)

    unless is_true_captcha do
      changeset = Accounts.User.changeset(user_params)

      conn
      |> put_flash(:danger, gettext("captcha error, pls input again."))

      render(conn, "new.html", error_message: gettext("captcha error, pls input again."))
    end

    create(conn, %{"user" => user_params})
  end

  def create(conn, %{"user" => user_params}) do
    %{"email" => email, "password" => password} = user_params

    case Accounts.get_user_by_email_and_password(email, password) do
      {:ok, user} ->
        UserAuth.log_in_user(conn, user, user_params)

      {:error, message} ->
        render(conn, "new.html", error_message: message)
    end
  end

  def delete(conn, _params) do
    conn
    |> put_flash(:info, "Logged out successfully.")
    |> UserAuth.log_out_user()
  end

  def force_logout(conn, _params) do
    conn
    |> put_flash(
      :info,
      "You were logged out. Please login again to continue using our application."
    )
    |> UserAuth.log_out_user()
  end

  def keep_alive(conn, _params) do
    conn
  end

  def captcha(conn, _) do
    {:ok, text, img_binary} = Captcha.get(50_000)

    conn
    |> put_session(:captcha, text)
    |> put_resp_header("Cache-Control", "no-cache, no-store, max-age=0, must-revalidate")
    |> put_resp_header("Pragma", "no-cache")
    |> put_resp_content_type("image/gif")
    |> send_resp(200, img_binary)
  end
end
