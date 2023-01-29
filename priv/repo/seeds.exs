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
    password: "123456789abc",
    password_confirmation: "123456789abc",
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

for i <- 1 .. 100 do
  {:ok, _post} =
    Api.Forum.create_posts(%{
      body: "This is an example post in your exBBS installation.  #{i}",
      description:  "Welcome to exBBS  #{i}",
      status: status,
      title:  "Welcome to exBBS #{i}",
      user: user,
      forum: forum,
      topic: topic
    })
end

{:ok, category} =
  Api.Forum.create_categories(%{
    description: "Description of your Second Category",
    order: 2,
    status: status,
    title: "Your Second Category",
    user: user
  })


{:ok, forum} =
  Api.Forum.create_forums(%{
    description: "Description of your Second Forum.",
    order: 1,
    status: status,
    title: "Your Second Forum.",
    category: category,
    user: user
  })

{:ok, topic} =
  Api.Forum.create_topics(%{
    description: "Welcome to exBBS Topic2",
    status: status,
    title: "Welcome to exBBS Topic2",
    user: user,
    forum: forum
  })

for i <- 1 .. 100 do
  {:ok, _post} =
    Api.Forum.create_posts(%{
      body: "This is an example post in your exBBS installation.  #{i}",
      description:  "Welcome to exBBS  #{i}",
      status: status,
      title:  "Welcome to exBBS #{i}",
      user: user,
      forum: forum,
      topic: topic
    })
end


