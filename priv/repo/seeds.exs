config = url = Application.get_env(:api, ApiWeb.Endpoint)
[{_, hostname}] = Keyword.get(url, :url)

{:ok, user_1} =
  Api.Accounts.register_user(%{
    email: "user1@" <> hostname,
    password: "123456789abc",
    password_confirmation: "123456789abc",
    username: "user1",
    terms: "on",
    active: true,
    confirmed_at: DateTime.utc_now()
  })

{:ok, user_2} =
  Api.Accounts.register_user(%{
    email: "user2@" <> hostname,
    password: "123456789abc",
    password_confirmation: "123456789abc",
    username: "user2",
    terms: "on",
    active: true,
    confirmed_at: DateTime.utc_now()
  })

{:ok, user_3} =
  Api.Accounts.register_user(%{
    email: "user3@" <> hostname,
    password: "123456789abc",
    password_confirmation: "123456789abc",
    username: "user3",
    terms: "on",
    active: true,
    confirmed_at: DateTime.utc_now()
  })
