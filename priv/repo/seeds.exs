config = url = Application.get_env(:api, ApiWeb.Endpoint)
[host: hostname, port: port] = Keyword.get(url, :url)

{:ok, status} =
  Api.Forum.create_status(%{
    title: "default",
    type: "system"
  })

{:ok, user} =
  Api.Accounts.register_user(%{
    email: "demo@" <> hostname,
    password: "demo",
    password_confirmation: "demo",
    username: "demo",
    terms: true,
    active: true,
    confirmed_at: DateTime.utc_now()
  })

{:ok, _user_2} =
  Api.Accounts.register_user(%{
    email: "user2@" <> hostname,
    password: "123456789abc",
    password_confirmation: "123456789abc",
    username: "user2",
    terms: true,
    active: true,
    confirmed_at: DateTime.utc_now()
  })

{:ok, _user_3} =
  Api.Accounts.register_user(%{
    email: "user3@" <> hostname,
    password: "123456789abc",
    password_confirmation: "123456789abc",
    username: "user3",
    terms: true,
    active: true,
    confirmed_at: DateTime.utc_now()
  })

{:ok, category} =
  Api.Forum.create_categories(%{
    description: "Description of your First Category",
    order: 1,
    status: status,
    title: "Your First Category",
    user: user
  })

{:ok, forum} =
  Api.Forum.create_forums(%{
    description: "Description of your First Forum.",
    order: 1,
    status: status,
    title: "Your First Forum.",
    category: category,
    user: user
  })

{:ok, topic} =
  Api.Forum.create_topics(%{
    description: "Welcome to exBBS",
    status: status,
    title: "Welcome to exBBS",
    user: user,
    forum: forum
  })

{:ok, post} =
  Api.Forum.create_posts(%{
    body: "This is an example post in your exBBS installation.",
    description:  "Welcome to exBBS",
    status: status,
    title:  "Welcome to exBBS",
    user: user,
    forum: forum,
    topic: topic
  })
