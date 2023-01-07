defmodule ApiWeb.UserAuth do
  import Plug.Conn
  import Phoenix.Controller

  alias Api.Accounts
  alias Api.Accounts.User
  alias ApiWeb.Router.Helpers, as: Routes

  @pubsub_topic "user_updates"

  # Make the remember me cookie valid for 60 days.
  # If you want bump or reduce this value, also change
  # the token expiry itself in UserToken.
  @max_age 60 * 60 * 24 * 60
  @remember_me_cookie "user_remember_me"
  @remember_me_options [sign: true, max_age: @max_age, same_site: "Lax"]

  @doc """
  Logs the user in.

  It renews the session ID and clears the whole session
  to avoid fixation attacks. See the renew_session
  function to customize this behaviour.

  It also sets a `:live_socket_id` key in the session,
  so LiveView sessions are identified and automatically
  disconnected on log out. The line can be safely removed
  if you are not using LiveView.
  """
  def log_in_user(conn, user, params \\ %{}) do
    token = Accounts.generate_user_session_token(user)
    user_return_to = get_session(conn, :user_return_to)

    role = List.first(user.performer.roles)

    current_user = user_session(user)

    #    {:ok, user} = last_login(user)

    Api.User.Server.Supervisor.start(current_user)

    # Guardian.Plug.sign_in( conn, user.email, :access)

    conn
    |> renew_session()
    |> put_session(:user_token, token)
    |> put_session(:current_user, current_user)
    |> put_session(:live_socket_id, "users_sessions:#{Base.url_encode64(token)}")
    |> maybe_write_remember_me_cookie(token, params)
    |> redirect(to: user_return_to || signed_in_path(conn, role))
  end

  defp user_session(user) do
    Map.drop(user, [
      :confirmed_at,
      :inserted_at,
      :active,
      :uid,
      :account_id,
      :last_login,
      :account
    ])
  end

  defp last_login(user) do
    data = %{user | last_login: DateTime.utc_now()}
    User.update_user(data)
  end


  defp maybe_write_remember_me_cookie(conn, token, %{"remember_me" => "true"}) do
    put_resp_cookie(conn, @remember_me_cookie, token, @remember_me_options)
  end

  defp maybe_write_remember_me_cookie(conn, _token, _params) do
    conn
  end

  # This function renews the session ID and erases the whole
  # session to avoid fixation attacks. If there is any data
  # in the session you may want to preserve after log in/log out,
  # you must explicitly fetch the session data before clearing
  # and then immediately set it after clearing, for example:
  #
  #     defp renew_session(conn) do
  #       preferred_locale = get_session(conn, :preferred_locale)
  #
  #       conn
  #       |> configure_session(renew: true)
  #       |> clear_session()
  #       |> put_session(:preferred_locale, preferred_locale)
  #     end
  #
  defp renew_session(conn) do
    conn
    |> configure_session(renew: true)
    |> clear_session()
  end

  @doc """
  Logs the user out.

  It clears all session data for safety. See renew_session.
  """
  def log_out_user(conn) do
    user_token = get_session(conn, :user_token)
    user = get_session(conn, :current_user)

    user_token && Accounts.delete_session_token(user_token)

    if live_socket_id = get_session(conn, :live_socket_id) do
      ApiWeb.Endpoint.broadcast(live_socket_id, "disconnect", %{})
    end

    unless is_nil(user) do
      Api.User.Server.Supervisor.stop(user)
    end

    jwt = Guardian.Plug.current_token(conn)

    # ApiWeb.Guardian.revoke(jwt)
    ## maybe log out github

    conn
    |> renew_session()
    |> delete_resp_cookie(@remember_me_cookie)
    |> redirect(to: "/")
  end

  def log_out_user_with_error(conn) do
    user_token = get_session(conn, :user_token)
    user = get_session(conn, :current_user)

    user_token && Accounts.delete_session_token(user_token)

    if live_socket_id = get_session(conn, :live_socket_id) do
      ApiWeb.Endpoint.broadcast(live_socket_id, "disconnect", %{})
    end

    unless is_nil(user) do
      Api.User.Server.Supervisor.stop(user)
    end

    jwt = Guardian.Plug.current_token(conn)

    # ApiWeb.Guardian.revoke(jwt)
    ## maybe log out github

    conn
    |> renew_session()
    |> put_flash(:error, "An Error Occurred.")
    |> delete_resp_cookie(@remember_me_cookie)
    |> redirect(to: "/")
  end

  @doc """
  Authenticates the user by looking into the session
  and remember me token.
  """
  def fetch_current_user(conn, _opts) do
    {user_token, conn} = ensure_user_token(conn)
    user = user_token && Accounts.get_user_by_session_token(user_token)
    assign(conn, :current_user, user)
  end

  defp ensure_user_token(conn) do
    if user_token = get_session(conn, :user_token) do
      {user_token, conn}
    else
      conn = fetch_cookies(conn, signed: [@remember_me_cookie])

      if user_token = conn.cookies[@remember_me_cookie] do
        {user_token, put_session(conn, :user_token, user_token)}
      else
        {nil, conn}
      end
    end
  end

  @doc """
  Used for routes that require the user to not be authenticated.
  """
  def redirect_if_user_is_authenticated(conn, _opts) do
    if conn.assigns[:current_user] do
      user = get_session(conn, :current_user)

      identifier =
        if is_nil(user) do
          "default"
        else
          user = Accounts.get_user!(user.id)
          role = List.first(user.performer.roles)

          Api.User.Server.Supervisor.start(user)

          case role do
            nil -> "default"
            role -> role.identifier
          end
        end

      conn
      |> redirect(to: signed_in_path(conn, identifier))
      |> halt()
    else
      conn
    end
  end

  @doc """
  Used for routes that require the user to be authenticated.

  If you want to enforce the user email is confirmed before
  they use the application at all, here would be a good place.
  """
  def require_authenticated_user(conn, _opts) do
    if conn.assigns[:current_user] do
      user = get_session(conn, :user)

      Api.User.Server.Supervisor.start(user)
      conn
    else
      conn
      |> put_flash(:error, "You must log in to access this page.")
      |> maybe_store_return_to()
      |> redirect(to: Routes.user_session_path(conn, :new))
      |> halt()
    end
  end

  @doc """
  Returns the pubsub topic name for receiving  notifications when a user updated
  """
  def pubsub_topic, do: @pubsub_topic

  defp maybe_store_return_to(%{method: "GET"} = conn) do
    %{request_path: request_path, query_string: query_string} = conn
    return_to = if query_string == "", do: request_path, else: request_path <> "?" <> query_string
    put_session(conn, :user_return_to, return_to)
  end

  defp maybe_store_return_to(conn), do: conn

  defp signed_in_path(conn, role) when is_map(role) do
    case role.identifier do
      "admin" ->
        "/admin"

      "user" ->
        "/home"

      _ ->
        log_out_user_with_error(conn)
    end
  end

  defp signed_in_path(conn, role) do
    case role do
      "admin" ->
        "/admin"

      "user" ->
        "/home"

      _ ->
        log_out_user_with_error(conn)
    end
  end
end
