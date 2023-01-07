defmodule ApiWeb.LiveHelpers do
  import Phoenix.LiveView
  alias Api.Accounts
  alias Api.Accounts.User
  alias ApiWeb.Router.Helpers, as: Routes
  alias ApiWeb.UserAuth
  import Phoenix.LiveView.Helpers
  import Phoenix.Component

  alias Phoenix.LiveView.JS

  @doc """
  Renders a live component inside a modal.

  The rendered modal receives a `:return_to` option to properly update
  the URL when the modal is closed.

  ## Examples

      <.modal return_to={Routes.setting_index_path(@socket, :index)}>
        <.live_component
          module={ApiWeb.SettingLive.FormComponent}
          id={@setting.id || :new}
          title={@page_title}
          action={@live_action}
          return_to={Routes.setting_index_path(@socket, :index)}
          setting: @setting
        />
      </.modal>
  """
  def modal(assigns) do
    assigns = assign_new(assigns, :return_to, fn -> nil end)

    ~H"""
    <div id="modal" class="phx-modal fade-in" phx-remove={hide_modal()}>
      <div
        id="modal-content"
        class="phx-modal-content fade-in-scale"
        phx-click-away={JS.dispatch("click", to: "#close")}
        phx-window-keydown={JS.dispatch("click", to: "#close")}
        phx-key="escape"
      >
        <%= if @return_to do %>
          <%= live_patch "✖",
            to: @return_to,
            id: "close",
            class: "phx-modal-close",
            phx_click: hide_modal()
          %>
        <% else %>
          <a id="close" href="#" class="phx-modal-close" phx-click={hide_modal()}>✖</a>
        <% end %>

        <%= render_slot(@inner_block) %>
      </div>
    </div>
    """
  end

  defp hide_modal(js \\ %JS{}) do
    js
    |> JS.hide(to: "#modal", transition: "fade-out")
    |> JS.hide(to: "#modal-content", transition: "fade-out-scale")
  end

  @doc """
  Renders a component inside the `ApiWeb.ModalComponent` component.

  The rendered modal receives a `:return_to` option to properly update
  the URL when the modal is closed.

  ## Examples

      <%= live_modal @socket, ApiWeb.XXX.FormComponent,
        id: @data.id || :new,
        action: @live_action,
        data: @data,
        return_to: Routes.property_index_path(@socket, :index) %>
  """
  def live_modal(socket, component, opts) do
    path = Keyword.fetch!(opts, :return_to)
    modal_opts = [id: :modal, return_to: path, component: component, opts: opts]
    live_component(socket, ApiWeb.ModalComponent, modal_opts)
  end

  def assign_defaults(session, socket) do
    ApiWeb.Endpoint.subscribe(UserAuth.pubsub_topic())

    socket =
      assign_new(socket, :current_user, fn ->
        find_current_user(session)
      end)

    case socket.assigns.current_user do
      %User{} ->
        socket

      _other ->
        socket
        |> put_flash(:error, "You must log in to access this page.")
        |> redirect(to: Routes.user_session_path(socket, :new))
    end
  end

  defp find_current_user(session) do
    with user_token when not is_nil(user_token) <- session["user_token"],
         %User{} = user <- Accounts.get_user_by_session_token(user_token),
         do: user
  end
end
