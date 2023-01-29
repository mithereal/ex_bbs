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

for i <- 1..100 do
  Api.Forum.create_categories(%{
    description: "Description of  #{i} Category",
    order: 1,
    status: status,
    title: "Your  #{i} Category",
    user: user
  })
end

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

for i <- 2..10 do
  {:ok, _post} =
    Api.Forum.create_posts(%{
      body: "This is an example post in your exBBS installation.  #{i}",
      description: "Welcome to exBBS  #{i}",
      status: status,
      title: "Welcome to exBBS #{i}",
      user: user,
      forum: forum,
      topic: topic
    })
end

categories =
  for i <- 2..25 do
    {:ok, category} =
      Api.Forum.create_categories(%{
        description: "Description of your #{i} Category",
        order: i,
        status: status,
        title: "Your #{i} Category",
        user: user
      })
    category
  end

forums =
  for i <- 2..20 do
    category = Enum.random(categories)
    {:ok, forum} = Api.Forum.create_forums(%{
      description: "Description of your  #{i} Forum.",
      order: i,
      status: status,
      title: "Your #{i} Forum.",
      category: category,
      user: user
    })
    forum
  end

topics =
  for i <- 2..100 do
    category = Enum.random(categories)
    forum = Enum.random(forums)
    {:ok, topic} =
      Api.Forum.create_topics(%{
        description: "Welcome to Topic #{i}",
        status: status,
        title: "Topic #{i}",
        user: user,
        forum: forum
      })
    topic
  end

for i <- 11..100 do
  category = Enum.random(categories)
  forum = Enum.random(forums)
  topic = Enum.random(topics)
  {:ok,_post} =
    Api.Forum.create_posts(%{
      body: "This is an example post in your exBBS installation.  #{i}",
      description: "Welcome to exBBS  #{i}",
      status: status,
      title: "Welcome to exBBS #{i}",
      user: user,
      forum: forum,
      topic: topic
    })
end
