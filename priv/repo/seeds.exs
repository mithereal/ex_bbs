config = url = Application.get_env(:api, ApiWeb.Endpoint)
[host: hostname, port: port] = Keyword.get(url, :url)

{:ok, user_1} =
  Api.Accounts.register_user(%{
    email: "user1@" <> hostname,
    password: "123456789abc",
    password_confirmation: "123456789abc",
    username: "user1",
    terms: true,
    active: true,
    confirmed_at: DateTime.utc_now()
  })

{:ok, user_2} =
  Api.Accounts.register_user(%{
    email: "user2@" <> hostname,
    password: "123456789abc",
    password_confirmation: "123456789abc",
    username: "user2",
    terms: true,
    active: true,
    confirmed_at: DateTime.utc_now()
  })

{:ok, user_3} =
  Api.Accounts.register_user(%{
    email: "user3@" <> hostname,
    password: "123456789abc",
    password_confirmation: "123456789abc",
    username: "user3",
    terms: true,
    active: true,
    confirmed_at: DateTime.utc_now()
  })

{:ok, category_1} =
  Api.Forum.create_categories(%{
    description: "Test Category Description",
    order: 1,
    status: 1,
    title: "Test Category",
    user: user_3
  })

{:ok, forum_1} =
  Api.Forum.create_forums(%{
    description: "Test Forum Description",
    order: 1,
    status: 1,
    title: "Test Forum",
    category: category_1,
    user: user_3
  })

{:ok, topic_1} =
  Api.Forum.create_topics(%{
    description: "Test Topic Description",
    status: 1,
    title: "Test Topic",
    user: user_3,
    forum: forum_1
  })

{:ok, post_1} =
  Api.Forum.create_posts(%{
    body: "Test Post Description",
    description: "Test Post Description",
    title: "Test Post",
    user: user_3,
    forum: forum_1,
    topic: topic_1
  })

