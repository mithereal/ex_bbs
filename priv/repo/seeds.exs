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

{:ok, delete_account} = Terminator.Ability.build("delete_account", "delete_account") |> Terminator.Repo.insert()
{:ok, add_account} = Terminator.Ability.build("add_account", "add_account") |> Terminator.Repo.insert()
{:ok, edit_account} = Terminator.Ability.build("edit_account", "edit_account") |> Terminator.Repo.insert()

{:ok, add_attachment} = Terminator.Ability.build("add_attachment", "add_attachment") |> Terminator.Repo.insert()
{:ok, delete_attachment} = Terminator.Ability.build("delete_attachment", "delete_attachment") |> Terminator.Repo.insert()

{:ok, delete_user_group} = Terminator.Ability.build("delete_user_group", "delete_user_group") |> Terminator.Repo.insert()
{:ok, add_user_group} = Terminator.Ability.build("add_user_group", "add_user_group") |> Terminator.Repo.insert()
{:ok, edit_user_group} = Terminator.Ability.build("edit_user_group", "edit_user_group") |> Terminator.Repo.insert()

{:ok, edit_user_username} = Terminator.Ability.build("edit_user_username", "edit_user_username") |> Terminator.Repo.insert()
{:ok, edit_user_password} = Terminator.Ability.build("edit_user_password", "edit_user_password") |> Terminator.Repo.insert()
{:ok, edit_user_profile} = Terminator.Ability.build("edit_user_profile", "edit_user_profile") |> Terminator.Repo.insert()
{:ok, edit_user_email} = Terminator.Ability.build("edit_user_email", "edit_user_email") |> Terminator.Repo.insert()

{:ok, delete_user_pm} = Terminator.Ability.build("delete_user_pm", "delete_user_pm") |> Terminator.Repo.insert()
{:ok, add_user_pm} = Terminator.Ability.build("add_user_pm", "add_user_pm") |> Terminator.Repo.insert()
{:ok, edit_user_pm} = Terminator.Ability.build("edit_user_pm", "edit_user_pm") |> Terminator.Repo.insert()

{:ok, delete_forum} = Terminator.Ability.build("delete_forum", "delete_forum") |> Terminator.Repo.insert()
{:ok, add_forum} = Terminator.Ability.build("add_forum", "add_forum") |> Terminator.Repo.insert()
{:ok, edit_forum} = Terminator.Ability.build("edit_forum", "edit_forum") |> Terminator.Repo.insert()

{:ok, approve_forum} = Terminator.Ability.build("approve_forum", "approve_forum") |> Terminator.Repo.insert()
{:ok, approve_topic} = Terminator.Ability.build("approve_topic", "approve_topic") |> Terminator.Repo.insert()
{:ok, approve_post} = Terminator.Ability.build("approve_post", "approve_post") |> Terminator.Repo.insert()

{:ok, delete_post} = Terminator.Ability.build("delete_post", "delete_post") |> Terminator.Repo.insert()
{:ok, add_post} = Terminator.Ability.build("add_post", "add_post") |> Terminator.Repo.insert()
{:ok, edit_post} = Terminator.Ability.build("edit_post", "edit_post") |> Terminator.Repo.insert()
{:ok, maintenance} = Terminator.Ability.build("maintenance", "maintenance") |> Terminator.Repo.insert()

{:ok, role} = Terminator.Role.build("admin", [], "Site administrator") |> Terminator.Repo.insert()

Terminator.Role.grant(role, delete_account)
Terminator.Role.grant(role, add_account)
Terminator.Role.grant(role, edit_account)
Terminator.Role.grant(role, add_attachment)
Terminator.Role.grant(role, delete_attachment)
Terminator.Role.grant(role, delete_user_group)
Terminator.Role.grant(role, add_user_group)
Terminator.Role.grant(role, edit_user_group)
Terminator.Role.grant(role, edit_user_username)
Terminator.Role.grant(role, edit_user_password)
Terminator.Role.grant(role, edit_user_profile)
Terminator.Role.grant(role, edit_user_email)
Terminator.Role.grant(role, delete_user_pm)
Terminator.Role.grant(role, add_user_pm)
Terminator.Role.grant(role, edit_user_pm)
Terminator.Role.grant(role, delete_forum)
Terminator.Role.grant(role, add_forum)
Terminator.Role.grant(role, edit_forum)
Terminator.Role.grant(role, approve_forum)
Terminator.Role.grant(role, approve_topic)
Terminator.Role.grant(role, approve_post)
Terminator.Role.grant(role, delete_post)
Terminator.Role.grant(role, add_post)
Terminator.Role.grant(role, maintenance)
