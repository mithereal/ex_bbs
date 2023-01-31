defmodule Api.Accounts.UserNotifier do
  use Phoenix.Swoosh, view: ApiWeb.EmailView, layout: {ApiWeb.LayoutView, :email}
  # For simplicity, this module simply logs messages to the terminal.
  # You should replace it by a proper email or notification tool, such as:
  #
  #   * Swoosh - https://hexdocs.pm/swoosh
  #   * Bamboo - https://hexdocs.pm/bamboo
  #
  @app_name "xxx.com"
  @from "no-reply@xxx.com"

  import Swoosh.Email
  alias Api.Mailer

  defp deliver(to, body) do
    require Logger
    Logger.debug(body)
    {:ok, %{to: to, body: body}}
  end

  @doc """
  Deliver instructions to confirm account.
  """
  def deliver_confirmation_instructions(user, url, :debug) do
    deliver(user.email, """

    ==============================

    Hi #{user.email},

    You can confirm your account by visiting the URL below:

    #{url}

    If you didn't create an account with us, please ignore this.

    ==============================
    """)
  end

  @doc """
  Deliver instructions to reset a user password.
  """
  def deliver_reset_password_instructions(user, url, mode \\ :debug) do
    deliver(user.email, """

    ==============================

    Hi #{user.email},

    You can reset your password by visiting the URL below:

    #{url}

    If you didn't request this change, please ignore this.

    ==============================
    """)
  end

  @doc """
  Deliver instructions to update a user email.
  """
  def deliver_update_email_instructions(user, url, mode \\ :debug) do
    deliver(user.email, """

    ==============================

    Hi #{user.email},

    You can change your email by visiting the URL below:

    #{url}

    If you didn't request this change, please ignore this.

    ==============================
    """)
  end

  #  use Swoosh
  def deliver_confirmation_instructions(user, url, :prod) do
    new()
    |> to({user.name, user.email})
    |> from(@from)
    |> subject("Welcome to " <> @app_name)
    |> Phoenix.Controller.render("confirm.html", %{username: user.username})
    |> premail()
    |> Mailer.deliver()
  end

  #  use Bamboo
  #  def deliver_confirmation_instructions(user, url) do
  #    new_email()
  #    |> subject("Welcome to " <> @app_name)
  #    |> to(user.email)
  #    |> from(@from)
  #    |> put_text_layout(false)
  #    |> render("welcome.html", %{username: user.username})
  #    |> premail()
  #  end

  defp premail(email) do
    html = Premailex.to_inline_css(email.html_body)
    text = Premailex.to_text(email.html_body)

    email
    |> html_body(html)
    |> text_body(text)
  end
end
