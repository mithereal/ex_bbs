defmodule ApiWeb.NotificationController do
  use ApiWeb, :controller

  alias Api.Notifications

  def index(conn, params) do
    result =
      conn
      |> current_user()
      |> Notifications.Queries.cond_user_notifications()
      |> Turbo.Ecto.turbo(params)

    render(conn, :index,
      notifications: result.datas,
      paginate: result.paginate
    )
  end

  def make_read(conn, _params) do
    conn
    |> current_user()
    |> Notifications.mark_read_notification()

    conn
    |> put_flash(:info, gettext("Marked all notifications readed."))
    |> redirect(to: Routes.notification_path(conn, :index))
  end

  def clean(conn, _params) do
    conn
    |> current_user()
    |> Notifications.clean_notification()

    conn
    |> put_flash(:info, gettext("Cleaned notification successfully"))
    |> redirect(to: Routes.notification_path(conn, :index))
  end
end
