defmodule ApiWeb.Router do
  use ApiWeb, :router
  use ApiWeb, :user_auth
  use Sentry.Plug

  alias ApiWeb.Plug.EnsureRole
  alias ApiWeb.Plug.MetaAttrs
  alias ApiWeb.Plug.Pixel

  pipeline :default_assigns do
    plug MetaAttrs
    plug Pixel
  end

  pipeline :browser do
    plug(:accepts, ["html"])
    plug(:fetch_session)
    plug(:fetch_live_flash)
    plug(:put_root_layout, {ApiWeb.LayoutView, "root.html"})
    plug(:protect_from_forgery)
    plug(:put_secure_browser_headers)
    plug(:fetch_current_user)
  end

  pipeline :admin_browser do
    plug(:accepts, ["html"])
    plug(:fetch_session)
    plug(:fetch_live_flash)
    plug(:put_root_layout, {ApiWeb.LayoutView, "admin.html"})
    plug(:protect_from_forgery)
    plug(:put_secure_browser_headers)
    plug(:fetch_current_user)
  end

  pipeline :user_browser do
    plug(:accepts, ["html"])
    plug(:fetch_session)
    plug(:fetch_live_flash)
    plug(:put_root_layout, {ApiWeb.LayoutView, "user.html"})
    plug(:protect_from_forgery)
    plug(:put_secure_browser_headers)
    plug(:fetch_current_user)
    plug :default_assigns
  end

  pipeline :pwa do
    plug(:accepts, ["html"])
    plug(:fetch_session)
    plug(:fetch_live_flash)
    plug(:put_root_layout, {ApiWeb.LayoutView, "pwa.html"})
    plug(:protect_from_forgery)
    plug(:put_secure_browser_headers)
    plug(:fetch_current_user)
    plug :default_assigns
  end

  pipeline :api do
    plug(:accepts, ["json"])
  end

  pipeline :user do
    plug(EnsureRole, [:admin, :user])
  end

  pipeline :admin do
    plug(EnsureRole, [:full_admin])
  end

  pipeline :browser_with_no_csrf do
    # Copy your browser plugin and comment out the following line
    # plug :protect_from_forgery
    plug(:fetch_session)
    plug(:fetch_live_flash)
    plug(:put_root_layout, {ApiWeb.LayoutView, :user})
    plug(:fetch_current_user)
  end

  pipeline :auth do
    plug Ueberauth
  end

  ## Authentication routes

  scope "/user", ApiWeb do
    pipe_through([:browser, :default_assigns, :redirect_if_user_is_authenticated])

    get("/register", UserRegistrationController, :new)
    post("/register", UserRegistrationController, :create)
    get("/log_in", UserSessionController, :new)
    post("/log_in", UserSessionController, :create)
    get("/reset_password", UserResetPasswordController, :new)
    post("/reset_password", UserResetPasswordController, :create)
    get("/reset_password/:token", UserResetPasswordController, :edit)
    put("/reset_password/:token", UserResetPasswordController, :update)
  end

  scope "/user", ApiWeb do
    pipe_through([:user_browser, :default_assigns, :require_authenticated_user])

    get("/force_logout", UserSessionController, :force_logout)
    get("/log_out", UserSessionController, :delete)
    delete("/log_out", UserSessionController, :delete)
    get("/confirm", UserConfirmationController, :new)
    post("/confirm", UserConfirmationController, :create)
    get("/confirm/:token", UserConfirmationController, :confirm)
  end

  scope "/profile", ApiWeb do
    pipe_through([:user_browser, :default_assigns, :require_authenticated_user])
    get("/", UserProfileController, :show)
    post("/", UserProfileController, :update)
    get("/:id", UserProfileController, :show)
  end

  scope "/posts", ApiWeb do
    pipe_through([:browser, :default_assigns])
    get "/", PostsController, :index
    get "/rss.xml", PostsController, :rss
    get "/show/:slug", PostsController, :show
  end

  scope "/gallery", ApiWeb do
    pipe_through([:user_browser, :default_assigns, :require_authenticated_user])

    live "/", ImageLive.Index, :index
    live "/image/new", ImageLive.Index, :new
    live "/image/:id/edit", ImageLive.Index, :edit

    live "/image/:id", ImageLive.Show, :show
    live "/image/:id/show/edit", ImageLive.Show, :edit
  end

  scope "/settings", ApiWeb do
    pipe_through([:user_browser, :default_assigns, :require_authenticated_user])

    get("/", UserSettingsController, :edit)
    put("/update_password", UserSettingsController, :update_password)
    put("/update_email", UserSettingsController, :update_email)
    get("/confirm_email/:token", UserSettingsController, :confirm_email)
  end

  scope "/home", ApiWeb do
    pipe_through([:user_browser, :default_assigns, :require_authenticated_user])

    live("/", UserDashboardLive)
  end

  scope "/admin", ApiWeb do
    pipe_through([:admin_browser, :default_assigns, :require_authenticated_user, :admin])

    live("/", AdminDashboardLive)
    live("/analytics", AdminDashboardAnalyticsLive)
    live("/errors", AdminFlamesLive)
    live("/accounts/online", AdminDashboardAccountsOnlineLive)
    live("/accounts/online/:email", AdminDashboardAccountsOnlineEmailLive)

    live "/accounts", AccountLive.Index, :index
    live "/accounts/new", AccountLive.Index, :new
    live "/accounts/:id/edit", AccountLive.Index, :edit

    live "/accounts/:id", AccountLive.Show, :show
    live "/accounts/:id/show/edit", AccountLive.Show, :edit
  end

  scope "/admin", ApiWeb do
    pipe_through([:admin_browser, :default_assigns, :require_authenticated_user, :admin])

    get("/accounts", AccountsController, :list)
    get("/profile/:email", UserProfileController, :show)
  end

  scope "/admin/settings", ApiWeb do
    pipe_through([:admin_browser, :default_assigns, :require_authenticated_user, :admin])

    get("/", AdminSettingsController, :edit)
    put("/update_password", AdminSettingsController, :update_password)
    put("/update_email", AdminSettingsController, :update_email)

    resources "/system", SettingController
    resources "/terminator", PerformerController
    resources "/categories", CategoriesController
    resources "/performers", PerformerController
    resources "/roles", RoleController
    resources "/abilities", AbilitiesController
    resources "/entities", EntitiesController
   # resources "/forums", ForumsController
    resources "/topics", TopicsController
   # resources "/posts", PostsController
  end

  scope "/", ApiWeb do
    pipe_through([:browser, :default_assigns, :redirect_if_user_is_authenticated])
  end

  scope "/", ApiWeb do
    pipe_through([:browser, :default_assigns])

    get "/keep-alive", UserSessionController, :keep_alive

    get "/", PageController, :front_page
    get "/rss.xml", RssController, :rss
  end

  scope "/search", ApiWeb do
    pipe_through([:browser, :default_assigns])

    get "/", SearchController, :index
  end

  scope "/forums", ApiWeb do
    pipe_through([:browser, :default_assigns])
    get "/forums", ForumsController, :index
    get "/forums/:id", ForumsController, :show
    get "/rss.xml", ForumsController, :rss
    get "/:slug/rss.xml", ForumsController, :forum_rss
  end

  scope "/topic", ApiWeb do
    pipe_through([:browser, :default_assigns])
    get "/rss.xml", TopicsController, :rss
    get "/:slug/rss.xml", TopicsController, :thread_rss
  end


  scope "/page", ApiWeb do
    pipe_through([:browser, :default_assigns])

    get("/contact", PageController, :contact)
    get("/privacy", PageController, :privacy)
    get("/terms", PageController, :terms)
    get("/faq", PageController, :faq)
  end

  scope "/page", ApiWeb do
    pipe_through([:pwa, :default_assigns])

    get("/pwa", PageController, :pwa)
  end

  scope "/websockets", ApiWeb do
    pipe_through([:pwa])
    get("/", PageController, :pwa)
  end

  scope "/auth", ApiWeb do
    pipe_through [:browser_with_no_csrf, :default_assigns, :redirect_if_user_is_authenticated]

    get "/:provider", AuthController, :request
    get "/:provider/callback", AuthController, :callback
  end

  # Other scopes may use custom stacks.

  # Enables LiveDashboard only for development
  #
  # If you want to use the LiveDashboard in production, you should put
  # it behind authentication and allow only admins to access it.
  # If your application does not have an admins-only section yet,
  # you can use Plug.BasicAuth to set up some basic authentication
  # as long as you are also using SSL (which you should anyway).

  if Mix.env() in [:dev, :test] do
    import Phoenix.LiveDashboard.Router

    scope "/" do
      pipe_through([:browser, :default_assigns])
      live_dashboard("/developer", metrics: ApiWeb.Telemetry)
    end
  end
end
