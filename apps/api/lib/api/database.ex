defmodule Api.Database do
  @moduledoc """
  The Database context.
  """

  import Ecto.Query, warn: false
  alias Api.Repo

  alias Api.Database.Category

  @doc """
  Returns the list of categories.

  ## Examples

      iex> list_categories()
      [%Category{}, ...]

  """
  def list_categories do
    Repo.all(Category)
  end

  @doc """
  Gets a single category.

  Raises `Ecto.NoResultsError` if the Category does not exist.

  ## Examples

      iex> get_category!(123)
      %Category{}

      iex> get_category!(456)
      ** (Ecto.NoResultsError)

  """
  def get_category!(id), do: Repo.get!(Category, id)

  @doc """
  Creates a category.

  ## Examples

      iex> create_category(%{field: value})
      {:ok, %Category{}}

      iex> create_category(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_category(attrs \\ %{}) do
    %Category{}
    |> Category.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a category.

  ## Examples

      iex> update_category(category, %{field: new_value})
      {:ok, %Category{}}

      iex> update_category(category, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_category(%Category{} = category, attrs) do
    category
    |> Category.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a category.

  ## Examples

      iex> delete_category(category)
      {:ok, %Category{}}

      iex> delete_category(category)
      {:error, %Ecto.Changeset{}}

  """
  def delete_category(%Category{} = category) do
    Repo.delete(category)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking category changes.

  ## Examples

      iex> change_category(category)
      %Ecto.Changeset{data: %Category{}}

  """
  def change_category(%Category{} = category, attrs \\ %{}) do
    Category.changeset(category, attrs)
  end

  alias Api.Database.Banlist

  @doc """
  Returns the list of banlist.

  ## Examples

      iex> list_banlist()
      [%Banlist{}, ...]

  """
  def list_banlist do
    Repo.all(Banlist)
  end

  @doc """
  Gets a single banlist.

  Raises `Ecto.NoResultsError` if the Banlist does not exist.

  ## Examples

      iex> get_banlist!(123)
      %Banlist{}

      iex> get_banlist!(456)
      ** (Ecto.NoResultsError)

  """
  def get_banlist!(id), do: Repo.get!(Banlist, id)

  @doc """
  Creates a banlist.

  ## Examples

      iex> create_banlist(%{field: value})
      {:ok, %Banlist{}}

      iex> create_banlist(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_banlist(attrs \\ %{}) do
    %Banlist{}
    |> Banlist.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a banlist.

  ## Examples

      iex> update_banlist(banlist, %{field: new_value})
      {:ok, %Banlist{}}

      iex> update_banlist(banlist, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_banlist(%Banlist{} = banlist, attrs) do
    banlist
    |> Banlist.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a banlist.

  ## Examples

      iex> delete_banlist(banlist)
      {:ok, %Banlist{}}

      iex> delete_banlist(banlist)
      {:error, %Ecto.Changeset{}}

  """
  def delete_banlist(%Banlist{} = banlist) do
    Repo.delete(banlist)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking banlist changes.

  ## Examples

      iex> change_banlist(banlist)
      %Ecto.Changeset{data: %Banlist{}}

  """
  def change_banlist(%Banlist{} = banlist, attrs \\ %{}) do
    Banlist.changeset(banlist, attrs)
  end

  alias Api.Database.Group

  @doc """
  Returns the list of groups.

  ## Examples

      iex> list_groups()
      [%Group{}, ...]

  """
  def list_groups do
    Repo.all(Group)
  end

  @doc """
  Gets a single group.

  Raises `Ecto.NoResultsError` if the Group does not exist.

  ## Examples

      iex> get_group!(123)
      %Group{}

      iex> get_group!(456)
      ** (Ecto.NoResultsError)

  """
  def get_group!(id), do: Repo.get!(Group, id)

  @doc """
  Creates a group.

  ## Examples

      iex> create_group(%{field: value})
      {:ok, %Group{}}

      iex> create_group(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_group(attrs \\ %{}) do
    %Group{}
    |> Group.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a group.

  ## Examples

      iex> update_group(group, %{field: new_value})
      {:ok, %Group{}}

      iex> update_group(group, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_group(%Group{} = group, attrs) do
    group
    |> Group.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a group.

  ## Examples

      iex> delete_group(group)
      {:ok, %Group{}}

      iex> delete_group(group)
      {:error, %Ecto.Changeset{}}

  """
  def delete_group(%Group{} = group) do
    Repo.delete(group)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking group changes.

  ## Examples

      iex> change_group(group)
      %Ecto.Changeset{data: %Group{}}

  """
  def change_group(%Group{} = group, attrs \\ %{}) do
    Group.changeset(group, attrs)
  end

  alias Api.Database.Confirm

  @doc """
  Returns the list of confirm.

  ## Examples

      iex> list_confirm()
      [%Confirm{}, ...]

  """
  def list_confirm do
    Repo.all(Confirm)
  end

  @doc """
  Gets a single confirm.

  Raises `Ecto.NoResultsError` if the Confirm does not exist.

  ## Examples

      iex> get_confirm!(123)
      %Confirm{}

      iex> get_confirm!(456)
      ** (Ecto.NoResultsError)

  """
  def get_confirm!(id), do: Repo.get!(Confirm, id)

  @doc """
  Creates a confirm.

  ## Examples

      iex> create_confirm(%{field: value})
      {:ok, %Confirm{}}

      iex> create_confirm(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_confirm(attrs \\ %{}) do
    %Confirm{}
    |> Confirm.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a confirm.

  ## Examples

      iex> update_confirm(confirm, %{field: new_value})
      {:ok, %Confirm{}}

      iex> update_confirm(confirm, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_confirm(%Confirm{} = confirm, attrs) do
    confirm
    |> Confirm.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a confirm.

  ## Examples

      iex> delete_confirm(confirm)
      {:ok, %Confirm{}}

      iex> delete_confirm(confirm)
      {:error, %Ecto.Changeset{}}

  """
  def delete_confirm(%Confirm{} = confirm) do
    Repo.delete(confirm)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking confirm changes.

  ## Examples

      iex> change_confirm(confirm)
      %Ecto.Changeset{data: %Confirm{}}

  """
  def change_confirm(%Confirm{} = confirm, attrs \\ %{}) do
    Confirm.changeset(confirm, attrs)
  end

  alias Api.Database.AuthAccess

  @doc """
  Returns the list of auth_access.

  ## Examples

      iex> list_auth_access()
      [%AuthAccess{}, ...]

  """
  def list_auth_access do
    Repo.all(AuthAccess)
  end

  @doc """
  Gets a single auth_access.

  Raises `Ecto.NoResultsError` if the Auth access does not exist.

  ## Examples

      iex> get_auth_access!(123)
      %AuthAccess{}

      iex> get_auth_access!(456)
      ** (Ecto.NoResultsError)

  """
  def get_auth_access!(id), do: Repo.get!(AuthAccess, id)

  @doc """
  Creates a auth_access.

  ## Examples

      iex> create_auth_access(%{field: value})
      {:ok, %AuthAccess{}}

      iex> create_auth_access(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_auth_access(attrs \\ %{}) do
    %AuthAccess{}
    |> AuthAccess.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a auth_access.

  ## Examples

      iex> update_auth_access(auth_access, %{field: new_value})
      {:ok, %AuthAccess{}}

      iex> update_auth_access(auth_access, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_auth_access(%AuthAccess{} = auth_access, attrs) do
    auth_access
    |> AuthAccess.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a auth_access.

  ## Examples

      iex> delete_auth_access(auth_access)
      {:ok, %AuthAccess{}}

      iex> delete_auth_access(auth_access)
      {:error, %Ecto.Changeset{}}

  """
  def delete_auth_access(%AuthAccess{} = auth_access) do
    Repo.delete(auth_access)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking auth_access changes.

  ## Examples

      iex> change_auth_access(auth_access)
      %Ecto.Changeset{data: %AuthAccess{}}

  """
  def change_auth_access(%AuthAccess{} = auth_access, attrs \\ %{}) do
    AuthAccess.changeset(auth_access, attrs)
  end

  alias Api.Database.Config

  @doc """
  Returns the list of config.

  ## Examples

      iex> list_config()
      [%Config{}, ...]

  """
  def list_config do
    Repo.all(Config)
  end

  @doc """
  Gets a single config.

  Raises `Ecto.NoResultsError` if the Config does not exist.

  ## Examples

      iex> get_config!(123)
      %Config{}

      iex> get_config!(456)
      ** (Ecto.NoResultsError)

  """
  def get_config!(id), do: Repo.get!(Config, id)

  @doc """
  Creates a config.

  ## Examples

      iex> create_config(%{field: value})
      {:ok, %Config{}}

      iex> create_config(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_config(attrs \\ %{}) do
    %Config{}
    |> Config.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a config.

  ## Examples

      iex> update_config(config, %{field: new_value})
      {:ok, %Config{}}

      iex> update_config(config, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_config(%Config{} = config, attrs) do
    config
    |> Config.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a config.

  ## Examples

      iex> delete_config(config)
      {:ok, %Config{}}

      iex> delete_config(config)
      {:error, %Ecto.Changeset{}}

  """
  def delete_config(%Config{} = config) do
    Repo.delete(config)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking config changes.

  ## Examples

      iex> change_config(config)
      %Ecto.Changeset{data: %Config{}}

  """
  def change_config(%Config{} = config, attrs \\ %{}) do
    Config.changeset(config, attrs)
  end

  alias Api.Database.Disallow

  @doc """
  Returns the list of disallow.

  ## Examples

      iex> list_disallow()
      [%Disallow{}, ...]

  """
  def list_disallow do
    Repo.all(Disallow)
  end

  @doc """
  Gets a single disallow.

  Raises `Ecto.NoResultsError` if the Disallow does not exist.

  ## Examples

      iex> get_disallow!(123)
      %Disallow{}

      iex> get_disallow!(456)
      ** (Ecto.NoResultsError)

  """
  def get_disallow!(id), do: Repo.get!(Disallow, id)

  @doc """
  Creates a disallow.

  ## Examples

      iex> create_disallow(%{field: value})
      {:ok, %Disallow{}}

      iex> create_disallow(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_disallow(attrs \\ %{}) do
    %Disallow{}
    |> Disallow.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a disallow.

  ## Examples

      iex> update_disallow(disallow, %{field: new_value})
      {:ok, %Disallow{}}

      iex> update_disallow(disallow, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_disallow(%Disallow{} = disallow, attrs) do
    disallow
    |> Disallow.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a disallow.

  ## Examples

      iex> delete_disallow(disallow)
      {:ok, %Disallow{}}

      iex> delete_disallow(disallow)
      {:error, %Ecto.Changeset{}}

  """
  def delete_disallow(%Disallow{} = disallow) do
    Repo.delete(disallow)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking disallow changes.

  ## Examples

      iex> change_disallow(disallow)
      %Ecto.Changeset{data: %Disallow{}}

  """
  def change_disallow(%Disallow{} = disallow, attrs \\ %{}) do
    Disallow.changeset(disallow, attrs)
  end

  alias Api.Database.Forum

  @doc """
  Returns the list of forums.

  ## Examples

      iex> list_forums()
      [%Forum{}, ...]

  """
  def list_forums do
    Repo.all(Forum)
  end

  @doc """
  Gets a single forum.

  Raises `Ecto.NoResultsError` if the Forum does not exist.

  ## Examples

      iex> get_forum!(123)
      %Forum{}

      iex> get_forum!(456)
      ** (Ecto.NoResultsError)

  """
  def get_forum!(id), do: Repo.get!(Forum, id)

  @doc """
  Creates a forum.

  ## Examples

      iex> create_forum(%{field: value})
      {:ok, %Forum{}}

      iex> create_forum(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_forum(attrs \\ %{}) do
    %Forum{}
    |> Forum.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a forum.

  ## Examples

      iex> update_forum(forum, %{field: new_value})
      {:ok, %Forum{}}

      iex> update_forum(forum, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_forum(%Forum{} = forum, attrs) do
    forum
    |> Forum.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a forum.

  ## Examples

      iex> delete_forum(forum)
      {:ok, %Forum{}}

      iex> delete_forum(forum)
      {:error, %Ecto.Changeset{}}

  """
  def delete_forum(%Forum{} = forum) do
    Repo.delete(forum)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking forum changes.

  ## Examples

      iex> change_forum(forum)
      %Ecto.Changeset{data: %Forum{}}

  """
  def change_forum(%Forum{} = forum, attrs \\ %{}) do
    Forum.changeset(forum, attrs)
  end

  alias Api.Database.ForumPrune

  @doc """
  Returns the list of forum_prune.

  ## Examples

      iex> list_forum_prune()
      [%ForumPrune{}, ...]

  """
  def list_forum_prune do
    Repo.all(ForumPrune)
  end

  @doc """
  Gets a single forum_prune.

  Raises `Ecto.NoResultsError` if the Forum prune does not exist.

  ## Examples

      iex> get_forum_prune!(123)
      %ForumPrune{}

      iex> get_forum_prune!(456)
      ** (Ecto.NoResultsError)

  """
  def get_forum_prune!(id), do: Repo.get!(ForumPrune, id)

  @doc """
  Creates a forum_prune.

  ## Examples

      iex> create_forum_prune(%{field: value})
      {:ok, %ForumPrune{}}

      iex> create_forum_prune(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_forum_prune(attrs \\ %{}) do
    %ForumPrune{}
    |> ForumPrune.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a forum_prune.

  ## Examples

      iex> update_forum_prune(forum_prune, %{field: new_value})
      {:ok, %ForumPrune{}}

      iex> update_forum_prune(forum_prune, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_forum_prune(%ForumPrune{} = forum_prune, attrs) do
    forum_prune
    |> ForumPrune.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a forum_prune.

  ## Examples

      iex> delete_forum_prune(forum_prune)
      {:ok, %ForumPrune{}}

      iex> delete_forum_prune(forum_prune)
      {:error, %Ecto.Changeset{}}

  """
  def delete_forum_prune(%ForumPrune{} = forum_prune) do
    Repo.delete(forum_prune)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking forum_prune changes.

  ## Examples

      iex> change_forum_prune(forum_prune)
      %Ecto.Changeset{data: %ForumPrune{}}

  """
  def change_forum_prune(%ForumPrune{} = forum_prune, attrs \\ %{}) do
    ForumPrune.changeset(forum_prune, attrs)
  end

  alias Api.Database.Post

  @doc """
  Returns the list of posts.

  ## Examples

      iex> list_posts()
      [%Post{}, ...]

  """
  def list_posts do
    Repo.all(Post)
  end

  @doc """
  Gets a single post.

  Raises `Ecto.NoResultsError` if the Post does not exist.

  ## Examples

      iex> get_post!(123)
      %Post{}

      iex> get_post!(456)
      ** (Ecto.NoResultsError)

  """
  def get_post!(id), do: Repo.get!(Post, id)

  @doc """
  Creates a post.

  ## Examples

      iex> create_post(%{field: value})
      {:ok, %Post{}}

      iex> create_post(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_post(attrs \\ %{}) do
    %Post{}
    |> Post.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a post.

  ## Examples

      iex> update_post(post, %{field: new_value})
      {:ok, %Post{}}

      iex> update_post(post, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_post(%Post{} = post, attrs) do
    post
    |> Post.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a post.

  ## Examples

      iex> delete_post(post)
      {:ok, %Post{}}

      iex> delete_post(post)
      {:error, %Ecto.Changeset{}}

  """
  def delete_post(%Post{} = post) do
    Repo.delete(post)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking post changes.

  ## Examples

      iex> change_post(post)
      %Ecto.Changeset{data: %Post{}}

  """
  def change_post(%Post{} = post, attrs \\ %{}) do
    Post.changeset(post, attrs)
  end

  alias Api.Database.PostText

  @doc """
  Returns the list of posts_text.

  ## Examples

      iex> list_posts_text()
      [%PostText{}, ...]

  """
  def list_posts_text do
    Repo.all(PostText)
  end

  @doc """
  Gets a single post_text.

  Raises `Ecto.NoResultsError` if the Post text does not exist.

  ## Examples

      iex> get_post_text!(123)
      %PostText{}

      iex> get_post_text!(456)
      ** (Ecto.NoResultsError)

  """
  def get_post_text!(id), do: Repo.get!(PostText, id)

  @doc """
  Creates a post_text.

  ## Examples

      iex> create_post_text(%{field: value})
      {:ok, %PostText{}}

      iex> create_post_text(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_post_text(attrs \\ %{}) do
    %PostText{}
    |> PostText.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a post_text.

  ## Examples

      iex> update_post_text(post_text, %{field: new_value})
      {:ok, %PostText{}}

      iex> update_post_text(post_text, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_post_text(%PostText{} = post_text, attrs) do
    post_text
    |> PostText.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a post_text.

  ## Examples

      iex> delete_post_text(post_text)
      {:ok, %PostText{}}

      iex> delete_post_text(post_text)
      {:error, %Ecto.Changeset{}}

  """
  def delete_post_text(%PostText{} = post_text) do
    Repo.delete(post_text)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking post_text changes.

  ## Examples

      iex> change_post_text(post_text)
      %Ecto.Changeset{data: %PostText{}}

  """
  def change_post_text(%PostText{} = post_text, attrs \\ %{}) do
    PostText.changeset(post_text, attrs)
  end

  alias Api.Database.PrivMsg

  @doc """
  Returns the list of privmsgs.

  ## Examples

      iex> list_privmsgs()
      [%PrivMsg{}, ...]

  """
  def list_privmsgs do
    Repo.all(PrivMsg)
  end

  @doc """
  Gets a single priv_msg.

  Raises `Ecto.NoResultsError` if the Priv msg does not exist.

  ## Examples

      iex> get_priv_msg!(123)
      %PrivMsg{}

      iex> get_priv_msg!(456)
      ** (Ecto.NoResultsError)

  """
  def get_priv_msg!(id), do: Repo.get!(PrivMsg, id)

  @doc """
  Creates a priv_msg.

  ## Examples

      iex> create_priv_msg(%{field: value})
      {:ok, %PrivMsg{}}

      iex> create_priv_msg(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_priv_msg(attrs \\ %{}) do
    %PrivMsg{}
    |> PrivMsg.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a priv_msg.

  ## Examples

      iex> update_priv_msg(priv_msg, %{field: new_value})
      {:ok, %PrivMsg{}}

      iex> update_priv_msg(priv_msg, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_priv_msg(%PrivMsg{} = priv_msg, attrs) do
    priv_msg
    |> PrivMsg.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a priv_msg.

  ## Examples

      iex> delete_priv_msg(priv_msg)
      {:ok, %PrivMsg{}}

      iex> delete_priv_msg(priv_msg)
      {:error, %Ecto.Changeset{}}

  """
  def delete_priv_msg(%PrivMsg{} = priv_msg) do
    Repo.delete(priv_msg)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking priv_msg changes.

  ## Examples

      iex> change_priv_msg(priv_msg)
      %Ecto.Changeset{data: %PrivMsg{}}

  """
  def change_priv_msg(%PrivMsg{} = priv_msg, attrs \\ %{}) do
    PrivMsg.changeset(priv_msg, attrs)
  end

  alias Api.Database.PrivMsgText

  @doc """
  Returns the list of privmsgs_text.

  ## Examples

      iex> list_privmsgs_text()
      [%PrivMsgText{}, ...]

  """
  def list_privmsgs_text do
    Repo.all(PrivMsgText)
  end

  @doc """
  Gets a single priv_msg_text.

  Raises `Ecto.NoResultsError` if the Priv msg text does not exist.

  ## Examples

      iex> get_priv_msg_text!(123)
      %PrivMsgText{}

      iex> get_priv_msg_text!(456)
      ** (Ecto.NoResultsError)

  """
  def get_priv_msg_text!(id), do: Repo.get!(PrivMsgText, id)

  @doc """
  Creates a priv_msg_text.

  ## Examples

      iex> create_priv_msg_text(%{field: value})
      {:ok, %PrivMsgText{}}

      iex> create_priv_msg_text(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_priv_msg_text(attrs \\ %{}) do
    %PrivMsgText{}
    |> PrivMsgText.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a priv_msg_text.

  ## Examples

      iex> update_priv_msg_text(priv_msg_text, %{field: new_value})
      {:ok, %PrivMsgText{}}

      iex> update_priv_msg_text(priv_msg_text, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_priv_msg_text(%PrivMsgText{} = priv_msg_text, attrs) do
    priv_msg_text
    |> PrivMsgText.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a priv_msg_text.

  ## Examples

      iex> delete_priv_msg_text(priv_msg_text)
      {:ok, %PrivMsgText{}}

      iex> delete_priv_msg_text(priv_msg_text)
      {:error, %Ecto.Changeset{}}

  """
  def delete_priv_msg_text(%PrivMsgText{} = priv_msg_text) do
    Repo.delete(priv_msg_text)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking priv_msg_text changes.

  ## Examples

      iex> change_priv_msg_text(priv_msg_text)
      %Ecto.Changeset{data: %PrivMsgText{}}

  """
  def change_priv_msg_text(%PrivMsgText{} = priv_msg_text, attrs \\ %{}) do
    PrivMsgText.changeset(priv_msg_text, attrs)
  end

  alias Api.Database.Rank

  @doc """
  Returns the list of ranks.

  ## Examples

      iex> list_ranks()
      [%Rank{}, ...]

  """
  def list_ranks do
    Repo.all(Rank)
  end

  @doc """
  Gets a single rank.

  Raises `Ecto.NoResultsError` if the Rank does not exist.

  ## Examples

      iex> get_rank!(123)
      %Rank{}

      iex> get_rank!(456)
      ** (Ecto.NoResultsError)

  """
  def get_rank!(id), do: Repo.get!(Rank, id)

  @doc """
  Creates a rank.

  ## Examples

      iex> create_rank(%{field: value})
      {:ok, %Rank{}}

      iex> create_rank(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_rank(attrs \\ %{}) do
    %Rank{}
    |> Rank.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a rank.

  ## Examples

      iex> update_rank(rank, %{field: new_value})
      {:ok, %Rank{}}

      iex> update_rank(rank, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_rank(%Rank{} = rank, attrs) do
    rank
    |> Rank.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a rank.

  ## Examples

      iex> delete_rank(rank)
      {:ok, %Rank{}}

      iex> delete_rank(rank)
      {:error, %Ecto.Changeset{}}

  """
  def delete_rank(%Rank{} = rank) do
    Repo.delete(rank)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking rank changes.

  ## Examples

      iex> change_rank(rank)
      %Ecto.Changeset{data: %Rank{}}

  """
  def change_rank(%Rank{} = rank, attrs \\ %{}) do
    Rank.changeset(rank, attrs)
  end

  alias Api.Database.SearchResult

  @doc """
  Returns the list of search_results.

  ## Examples

      iex> list_search_results()
      [%SearchResult{}, ...]

  """
  def list_search_results do
    Repo.all(SearchResult)
  end

  @doc """
  Gets a single search_result.

  Raises `Ecto.NoResultsError` if the Search result does not exist.

  ## Examples

      iex> get_search_result!(123)
      %SearchResult{}

      iex> get_search_result!(456)
      ** (Ecto.NoResultsError)

  """
  def get_search_result!(id), do: Repo.get!(SearchResult, id)

  @doc """
  Creates a search_result.

  ## Examples

      iex> create_search_result(%{field: value})
      {:ok, %SearchResult{}}

      iex> create_search_result(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_search_result(attrs \\ %{}) do
    %SearchResult{}
    |> SearchResult.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a search_result.

  ## Examples

      iex> update_search_result(search_result, %{field: new_value})
      {:ok, %SearchResult{}}

      iex> update_search_result(search_result, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_search_result(%SearchResult{} = search_result, attrs) do
    search_result
    |> SearchResult.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a search_result.

  ## Examples

      iex> delete_search_result(search_result)
      {:ok, %SearchResult{}}

      iex> delete_search_result(search_result)
      {:error, %Ecto.Changeset{}}

  """
  def delete_search_result(%SearchResult{} = search_result) do
    Repo.delete(search_result)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking search_result changes.

  ## Examples

      iex> change_search_result(search_result)
      %Ecto.Changeset{data: %SearchResult{}}

  """
  def change_search_result(%SearchResult{} = search_result, attrs \\ %{}) do
    SearchResult.changeset(search_result, attrs)
  end

  alias Api.Database.SearchWordlist

  @doc """
  Returns the list of search_wordlist.

  ## Examples

      iex> list_search_wordlist()
      [%SearchWordlist{}, ...]

  """
  def list_search_wordlist do
    Repo.all(SearchWordlist)
  end

  @doc """
  Gets a single search_wordlist.

  Raises `Ecto.NoResultsError` if the Search wordlist does not exist.

  ## Examples

      iex> get_search_wordlist!(123)
      %SearchWordlist{}

      iex> get_search_wordlist!(456)
      ** (Ecto.NoResultsError)

  """
  def get_search_wordlist!(id), do: Repo.get!(SearchWordlist, id)

  @doc """
  Creates a search_wordlist.

  ## Examples

      iex> create_search_wordlist(%{field: value})
      {:ok, %SearchWordlist{}}

      iex> create_search_wordlist(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_search_wordlist(attrs \\ %{}) do
    %SearchWordlist{}
    |> SearchWordlist.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a search_wordlist.

  ## Examples

      iex> update_search_wordlist(search_wordlist, %{field: new_value})
      {:ok, %SearchWordlist{}}

      iex> update_search_wordlist(search_wordlist, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_search_wordlist(%SearchWordlist{} = search_wordlist, attrs) do
    search_wordlist
    |> SearchWordlist.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a search_wordlist.

  ## Examples

      iex> delete_search_wordlist(search_wordlist)
      {:ok, %SearchWordlist{}}

      iex> delete_search_wordlist(search_wordlist)
      {:error, %Ecto.Changeset{}}

  """
  def delete_search_wordlist(%SearchWordlist{} = search_wordlist) do
    Repo.delete(search_wordlist)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking search_wordlist changes.

  ## Examples

      iex> change_search_wordlist(search_wordlist)
      %Ecto.Changeset{data: %SearchWordlist{}}

  """
  def change_search_wordlist(%SearchWordlist{} = search_wordlist, attrs \\ %{}) do
    SearchWordlist.changeset(search_wordlist, attrs)
  end

  alias Api.Database.SearchWordmatch

  @doc """
  Returns the list of search_wordmatch.

  ## Examples

      iex> list_search_wordmatch()
      [%SearchWordmatch{}, ...]

  """
  def list_search_wordmatch do
    Repo.all(SearchWordmatch)
  end

  @doc """
  Gets a single search_wordmatch.

  Raises `Ecto.NoResultsError` if the Search wordmatch does not exist.

  ## Examples

      iex> get_search_wordmatch!(123)
      %SearchWordmatch{}

      iex> get_search_wordmatch!(456)
      ** (Ecto.NoResultsError)

  """
  def get_search_wordmatch!(id), do: Repo.get!(SearchWordmatch, id)

  @doc """
  Creates a search_wordmatch.

  ## Examples

      iex> create_search_wordmatch(%{field: value})
      {:ok, %SearchWordmatch{}}

      iex> create_search_wordmatch(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_search_wordmatch(attrs \\ %{}) do
    %SearchWordmatch{}
    |> SearchWordmatch.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a search_wordmatch.

  ## Examples

      iex> update_search_wordmatch(search_wordmatch, %{field: new_value})
      {:ok, %SearchWordmatch{}}

      iex> update_search_wordmatch(search_wordmatch, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_search_wordmatch(%SearchWordmatch{} = search_wordmatch, attrs) do
    search_wordmatch
    |> SearchWordmatch.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a search_wordmatch.

  ## Examples

      iex> delete_search_wordmatch(search_wordmatch)
      {:ok, %SearchWordmatch{}}

      iex> delete_search_wordmatch(search_wordmatch)
      {:error, %Ecto.Changeset{}}

  """
  def delete_search_wordmatch(%SearchWordmatch{} = search_wordmatch) do
    Repo.delete(search_wordmatch)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking search_wordmatch changes.

  ## Examples

      iex> change_search_wordmatch(search_wordmatch)
      %Ecto.Changeset{data: %SearchWordmatch{}}

  """
  def change_search_wordmatch(%SearchWordmatch{} = search_wordmatch, attrs \\ %{}) do
    SearchWordmatch.changeset(search_wordmatch, attrs)
  end

  alias Api.Database.Session

  @doc """
  Returns the list of sessions.

  ## Examples

      iex> list_sessions()
      [%Session{}, ...]

  """
  def list_sessions do
    Repo.all(Session)
  end

  @doc """
  Gets a single session.

  Raises `Ecto.NoResultsError` if the Session does not exist.

  ## Examples

      iex> get_session!(123)
      %Session{}

      iex> get_session!(456)
      ** (Ecto.NoResultsError)

  """
  def get_session!(id), do: Repo.get!(Session, id)

  @doc """
  Creates a session.

  ## Examples

      iex> create_session(%{field: value})
      {:ok, %Session{}}

      iex> create_session(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_session(attrs \\ %{}) do
    %Session{}
    |> Session.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a session.

  ## Examples

      iex> update_session(session, %{field: new_value})
      {:ok, %Session{}}

      iex> update_session(session, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_session(%Session{} = session, attrs) do
    session
    |> Session.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a session.

  ## Examples

      iex> delete_session(session)
      {:ok, %Session{}}

      iex> delete_session(session)
      {:error, %Ecto.Changeset{}}

  """
  def delete_session(%Session{} = session) do
    Repo.delete(session)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking session changes.

  ## Examples

      iex> change_session(session)
      %Ecto.Changeset{data: %Session{}}

  """
  def change_session(%Session{} = session, attrs \\ %{}) do
    Session.changeset(session, attrs)
  end

  alias Api.Database.SessionKeys

  @doc """
  Returns the list of sessions_keys.

  ## Examples

      iex> list_sessions_keys()
      [%SessionKeys{}, ...]

  """
  def list_sessions_keys do
    Repo.all(SessionKeys)
  end

  @doc """
  Gets a single session_keys.

  Raises `Ecto.NoResultsError` if the Session keys does not exist.

  ## Examples

      iex> get_session_keys!(123)
      %SessionKeys{}

      iex> get_session_keys!(456)
      ** (Ecto.NoResultsError)

  """
  def get_session_keys!(id), do: Repo.get!(SessionKeys, id)

  @doc """
  Creates a session_keys.

  ## Examples

      iex> create_session_keys(%{field: value})
      {:ok, %SessionKeys{}}

      iex> create_session_keys(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_session_keys(attrs \\ %{}) do
    %SessionKeys{}
    |> SessionKeys.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a session_keys.

  ## Examples

      iex> update_session_keys(session_keys, %{field: new_value})
      {:ok, %SessionKeys{}}

      iex> update_session_keys(session_keys, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_session_keys(%SessionKeys{} = session_keys, attrs) do
    session_keys
    |> SessionKeys.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a session_keys.

  ## Examples

      iex> delete_session_keys(session_keys)
      {:ok, %SessionKeys{}}

      iex> delete_session_keys(session_keys)
      {:error, %Ecto.Changeset{}}

  """
  def delete_session_keys(%SessionKeys{} = session_keys) do
    Repo.delete(session_keys)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking session_keys changes.

  ## Examples

      iex> change_session_keys(session_keys)
      %Ecto.Changeset{data: %SessionKeys{}}

  """
  def change_session_keys(%SessionKeys{} = session_keys, attrs \\ %{}) do
    SessionKeys.changeset(session_keys, attrs)
  end

  alias Api.Database.Smiles

  @doc """
  Returns the list of smiles.

  ## Examples

      iex> list_smiles()
      [%Smiles{}, ...]

  """
  def list_smiles do
    Repo.all(Smiles)
  end

  @doc """
  Gets a single smiles.

  Raises `Ecto.NoResultsError` if the Smiles does not exist.

  ## Examples

      iex> get_smiles!(123)
      %Smiles{}

      iex> get_smiles!(456)
      ** (Ecto.NoResultsError)

  """
  def get_smiles!(id), do: Repo.get!(Smiles, id)

  @doc """
  Creates a smiles.

  ## Examples

      iex> create_smiles(%{field: value})
      {:ok, %Smiles{}}

      iex> create_smiles(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_smiles(attrs \\ %{}) do
    %Smiles{}
    |> Smiles.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a smiles.

  ## Examples

      iex> update_smiles(smiles, %{field: new_value})
      {:ok, %Smiles{}}

      iex> update_smiles(smiles, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_smiles(%Smiles{} = smiles, attrs) do
    smiles
    |> Smiles.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a smiles.

  ## Examples

      iex> delete_smiles(smiles)
      {:ok, %Smiles{}}

      iex> delete_smiles(smiles)
      {:error, %Ecto.Changeset{}}

  """
  def delete_smiles(%Smiles{} = smiles) do
    Repo.delete(smiles)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking smiles changes.

  ## Examples

      iex> change_smiles(smiles)
      %Ecto.Changeset{data: %Smiles{}}

  """
  def change_smiles(%Smiles{} = smiles, attrs \\ %{}) do
    Smiles.changeset(smiles, attrs)
  end

  alias Api.Database.Theme

  @doc """
  Returns the list of themes.

  ## Examples

      iex> list_themes()
      [%Theme{}, ...]

  """
  def list_themes do
    Repo.all(Theme)
  end

  @doc """
  Gets a single theme.

  Raises `Ecto.NoResultsError` if the Theme does not exist.

  ## Examples

      iex> get_theme!(123)
      %Theme{}

      iex> get_theme!(456)
      ** (Ecto.NoResultsError)

  """
  def get_theme!(id), do: Repo.get!(Theme, id)

  @doc """
  Creates a theme.

  ## Examples

      iex> create_theme(%{field: value})
      {:ok, %Theme{}}

      iex> create_theme(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_theme(attrs \\ %{}) do
    %Theme{}
    |> Theme.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a theme.

  ## Examples

      iex> update_theme(theme, %{field: new_value})
      {:ok, %Theme{}}

      iex> update_theme(theme, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_theme(%Theme{} = theme, attrs) do
    theme
    |> Theme.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a theme.

  ## Examples

      iex> delete_theme(theme)
      {:ok, %Theme{}}

      iex> delete_theme(theme)
      {:error, %Ecto.Changeset{}}

  """
  def delete_theme(%Theme{} = theme) do
    Repo.delete(theme)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking theme changes.

  ## Examples

      iex> change_theme(theme)
      %Ecto.Changeset{data: %Theme{}}

  """
  def change_theme(%Theme{} = theme, attrs \\ %{}) do
    Theme.changeset(theme, attrs)
  end

  alias Api.Database.ThemeName

  @doc """
  Returns the list of themes_name.

  ## Examples

      iex> list_themes_name()
      [%ThemeName{}, ...]

  """
  def list_themes_name do
    Repo.all(ThemeName)
  end

  @doc """
  Gets a single theme_name.

  Raises `Ecto.NoResultsError` if the Theme name does not exist.

  ## Examples

      iex> get_theme_name!(123)
      %ThemeName{}

      iex> get_theme_name!(456)
      ** (Ecto.NoResultsError)

  """
  def get_theme_name!(id), do: Repo.get!(ThemeName, id)

  @doc """
  Creates a theme_name.

  ## Examples

      iex> create_theme_name(%{field: value})
      {:ok, %ThemeName{}}

      iex> create_theme_name(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_theme_name(attrs \\ %{}) do
    %ThemeName{}
    |> ThemeName.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a theme_name.

  ## Examples

      iex> update_theme_name(theme_name, %{field: new_value})
      {:ok, %ThemeName{}}

      iex> update_theme_name(theme_name, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_theme_name(%ThemeName{} = theme_name, attrs) do
    theme_name
    |> ThemeName.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a theme_name.

  ## Examples

      iex> delete_theme_name(theme_name)
      {:ok, %ThemeName{}}

      iex> delete_theme_name(theme_name)
      {:error, %Ecto.Changeset{}}

  """
  def delete_theme_name(%ThemeName{} = theme_name) do
    Repo.delete(theme_name)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking theme_name changes.

  ## Examples

      iex> change_theme_name(theme_name)
      %Ecto.Changeset{data: %ThemeName{}}

  """
  def change_theme_name(%ThemeName{} = theme_name, attrs \\ %{}) do
    ThemeName.changeset(theme_name, attrs)
  end

  alias Api.Database.Topic

  @doc """
  Returns the list of topics.

  ## Examples

      iex> list_topics()
      [%Topic{}, ...]

  """
  def list_topics do
    Repo.all(Topic)
  end

  @doc """
  Gets a single topic.

  Raises `Ecto.NoResultsError` if the Topic does not exist.

  ## Examples

      iex> get_topic!(123)
      %Topic{}

      iex> get_topic!(456)
      ** (Ecto.NoResultsError)

  """
  def get_topic!(id), do: Repo.get!(Topic, id)

  @doc """
  Creates a topic.

  ## Examples

      iex> create_topic(%{field: value})
      {:ok, %Topic{}}

      iex> create_topic(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_topic(attrs \\ %{}) do
    %Topic{}
    |> Topic.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a topic.

  ## Examples

      iex> update_topic(topic, %{field: new_value})
      {:ok, %Topic{}}

      iex> update_topic(topic, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_topic(%Topic{} = topic, attrs) do
    topic
    |> Topic.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a topic.

  ## Examples

      iex> delete_topic(topic)
      {:ok, %Topic{}}

      iex> delete_topic(topic)
      {:error, %Ecto.Changeset{}}

  """
  def delete_topic(%Topic{} = topic) do
    Repo.delete(topic)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking topic changes.

  ## Examples

      iex> change_topic(topic)
      %Ecto.Changeset{data: %Topic{}}

  """
  def change_topic(%Topic{} = topic, attrs \\ %{}) do
    Topic.changeset(topic, attrs)
  end

  alias Api.Database.TopicWatch

  @doc """
  Returns the list of topics_watch.

  ## Examples

      iex> list_topics_watch()
      [%TopicWatch{}, ...]

  """
  def list_topics_watch do
    Repo.all(TopicWatch)
  end

  @doc """
  Gets a single topic_watch.

  Raises `Ecto.NoResultsError` if the Topic watch does not exist.

  ## Examples

      iex> get_topic_watch!(123)
      %TopicWatch{}

      iex> get_topic_watch!(456)
      ** (Ecto.NoResultsError)

  """
  def get_topic_watch!(id), do: Repo.get!(TopicWatch, id)

  @doc """
  Creates a topic_watch.

  ## Examples

      iex> create_topic_watch(%{field: value})
      {:ok, %TopicWatch{}}

      iex> create_topic_watch(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_topic_watch(attrs \\ %{}) do
    %TopicWatch{}
    |> TopicWatch.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a topic_watch.

  ## Examples

      iex> update_topic_watch(topic_watch, %{field: new_value})
      {:ok, %TopicWatch{}}

      iex> update_topic_watch(topic_watch, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_topic_watch(%TopicWatch{} = topic_watch, attrs) do
    topic_watch
    |> TopicWatch.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a topic_watch.

  ## Examples

      iex> delete_topic_watch(topic_watch)
      {:ok, %TopicWatch{}}

      iex> delete_topic_watch(topic_watch)
      {:error, %Ecto.Changeset{}}

  """
  def delete_topic_watch(%TopicWatch{} = topic_watch) do
    Repo.delete(topic_watch)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking topic_watch changes.

  ## Examples

      iex> change_topic_watch(topic_watch)
      %Ecto.Changeset{data: %TopicWatch{}}

  """
  def change_topic_watch(%TopicWatch{} = topic_watch, attrs \\ %{}) do
    TopicWatch.changeset(topic_watch, attrs)
  end

  alias Api.Database.UserGroup

  @doc """
  Returns the list of user_group.

  ## Examples

      iex> list_user_group()
      [%UserGroup{}, ...]

  """
  def list_user_group do
    Repo.all(UserGroup)
  end

  @doc """
  Gets a single user_group.

  Raises `Ecto.NoResultsError` if the User group does not exist.

  ## Examples

      iex> get_user_group!(123)
      %UserGroup{}

      iex> get_user_group!(456)
      ** (Ecto.NoResultsError)

  """
  def get_user_group!(id), do: Repo.get!(UserGroup, id)

  @doc """
  Creates a user_group.

  ## Examples

      iex> create_user_group(%{field: value})
      {:ok, %UserGroup{}}

      iex> create_user_group(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_user_group(attrs \\ %{}) do
    %UserGroup{}
    |> UserGroup.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a user_group.

  ## Examples

      iex> update_user_group(user_group, %{field: new_value})
      {:ok, %UserGroup{}}

      iex> update_user_group(user_group, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_user_group(%UserGroup{} = user_group, attrs) do
    user_group
    |> UserGroup.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a user_group.

  ## Examples

      iex> delete_user_group(user_group)
      {:ok, %UserGroup{}}

      iex> delete_user_group(user_group)
      {:error, %Ecto.Changeset{}}

  """
  def delete_user_group(%UserGroup{} = user_group) do
    Repo.delete(user_group)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking user_group changes.

  ## Examples

      iex> change_user_group(user_group)
      %Ecto.Changeset{data: %UserGroup{}}

  """
  def change_user_group(%UserGroup{} = user_group, attrs \\ %{}) do
    UserGroup.changeset(user_group, attrs)
  end

  alias Api.Database.User

  @doc """
  Returns the list of users.

  ## Examples

      iex> list_users()
      [%User{}, ...]

  """
  def list_users do
    Repo.all(User)
  end

  @doc """
  Gets a single user.

  Raises `Ecto.NoResultsError` if the User does not exist.

  ## Examples

      iex> get_user!(123)
      %User{}

      iex> get_user!(456)
      ** (Ecto.NoResultsError)

  """
  def get_user!(id), do: Repo.get!(User, id)

  @doc """
  Creates a user.

  ## Examples

      iex> create_user(%{field: value})
      {:ok, %User{}}

      iex> create_user(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_user(attrs \\ %{}) do
    %User{}
    |> User.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a user.

  ## Examples

      iex> update_user(user, %{field: new_value})
      {:ok, %User{}}

      iex> update_user(user, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_user(%User{} = user, attrs) do
    user
    |> User.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a user.

  ## Examples

      iex> delete_user(user)
      {:ok, %User{}}

      iex> delete_user(user)
      {:error, %Ecto.Changeset{}}

  """
  def delete_user(%User{} = user) do
    Repo.delete(user)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking user changes.

  ## Examples

      iex> change_user(user)
      %Ecto.Changeset{data: %User{}}

  """
  def change_user(%User{} = user, attrs \\ %{}) do
    User.changeset(user, attrs)
  end

  alias Api.Database.VoteDesc

  @doc """
  Returns the list of vote_desc.

  ## Examples

      iex> list_vote_desc()
      [%VoteDesc{}, ...]

  """
  def list_vote_desc do
    Repo.all(VoteDesc)
  end

  @doc """
  Gets a single vote_desc.

  Raises `Ecto.NoResultsError` if the Vote desc does not exist.

  ## Examples

      iex> get_vote_desc!(123)
      %VoteDesc{}

      iex> get_vote_desc!(456)
      ** (Ecto.NoResultsError)

  """
  def get_vote_desc!(id), do: Repo.get!(VoteDesc, id)

  @doc """
  Creates a vote_desc.

  ## Examples

      iex> create_vote_desc(%{field: value})
      {:ok, %VoteDesc{}}

      iex> create_vote_desc(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_vote_desc(attrs \\ %{}) do
    %VoteDesc{}
    |> VoteDesc.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a vote_desc.

  ## Examples

      iex> update_vote_desc(vote_desc, %{field: new_value})
      {:ok, %VoteDesc{}}

      iex> update_vote_desc(vote_desc, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_vote_desc(%VoteDesc{} = vote_desc, attrs) do
    vote_desc
    |> VoteDesc.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a vote_desc.

  ## Examples

      iex> delete_vote_desc(vote_desc)
      {:ok, %VoteDesc{}}

      iex> delete_vote_desc(vote_desc)
      {:error, %Ecto.Changeset{}}

  """
  def delete_vote_desc(%VoteDesc{} = vote_desc) do
    Repo.delete(vote_desc)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking vote_desc changes.

  ## Examples

      iex> change_vote_desc(vote_desc)
      %Ecto.Changeset{data: %VoteDesc{}}

  """
  def change_vote_desc(%VoteDesc{} = vote_desc, attrs \\ %{}) do
    VoteDesc.changeset(vote_desc, attrs)
  end

  alias Api.Database.VoteResult

  @doc """
  Returns the list of vote_results.

  ## Examples

      iex> list_vote_results()
      [%VoteResult{}, ...]

  """
  def list_vote_results do
    Repo.all(VoteResult)
  end

  @doc """
  Gets a single vote_result.

  Raises `Ecto.NoResultsError` if the Vote result does not exist.

  ## Examples

      iex> get_vote_result!(123)
      %VoteResult{}

      iex> get_vote_result!(456)
      ** (Ecto.NoResultsError)

  """
  def get_vote_result!(id), do: Repo.get!(VoteResult, id)

  @doc """
  Creates a vote_result.

  ## Examples

      iex> create_vote_result(%{field: value})
      {:ok, %VoteResult{}}

      iex> create_vote_result(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_vote_result(attrs \\ %{}) do
    %VoteResult{}
    |> VoteResult.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a vote_result.

  ## Examples

      iex> update_vote_result(vote_result, %{field: new_value})
      {:ok, %VoteResult{}}

      iex> update_vote_result(vote_result, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_vote_result(%VoteResult{} = vote_result, attrs) do
    vote_result
    |> VoteResult.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a vote_result.

  ## Examples

      iex> delete_vote_result(vote_result)
      {:ok, %VoteResult{}}

      iex> delete_vote_result(vote_result)
      {:error, %Ecto.Changeset{}}

  """
  def delete_vote_result(%VoteResult{} = vote_result) do
    Repo.delete(vote_result)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking vote_result changes.

  ## Examples

      iex> change_vote_result(vote_result)
      %Ecto.Changeset{data: %VoteResult{}}

  """
  def change_vote_result(%VoteResult{} = vote_result, attrs \\ %{}) do
    VoteResult.changeset(vote_result, attrs)
  end

  alias Api.Database.VoteVoter

  @doc """
  Returns the list of vote_voters.

  ## Examples

      iex> list_vote_voters()
      [%VoteVoter{}, ...]

  """
  def list_vote_voters do
    Repo.all(VoteVoter)
  end

  @doc """
  Gets a single vote_voter.

  Raises `Ecto.NoResultsError` if the Vote voter does not exist.

  ## Examples

      iex> get_vote_voter!(123)
      %VoteVoter{}

      iex> get_vote_voter!(456)
      ** (Ecto.NoResultsError)

  """
  def get_vote_voter!(id), do: Repo.get!(VoteVoter, id)

  @doc """
  Creates a vote_voter.

  ## Examples

      iex> create_vote_voter(%{field: value})
      {:ok, %VoteVoter{}}

      iex> create_vote_voter(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_vote_voter(attrs \\ %{}) do
    %VoteVoter{}
    |> VoteVoter.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a vote_voter.

  ## Examples

      iex> update_vote_voter(vote_voter, %{field: new_value})
      {:ok, %VoteVoter{}}

      iex> update_vote_voter(vote_voter, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_vote_voter(%VoteVoter{} = vote_voter, attrs) do
    vote_voter
    |> VoteVoter.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a vote_voter.

  ## Examples

      iex> delete_vote_voter(vote_voter)
      {:ok, %VoteVoter{}}

      iex> delete_vote_voter(vote_voter)
      {:error, %Ecto.Changeset{}}

  """
  def delete_vote_voter(%VoteVoter{} = vote_voter) do
    Repo.delete(vote_voter)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking vote_voter changes.

  ## Examples

      iex> change_vote_voter(vote_voter)
      %Ecto.Changeset{data: %VoteVoter{}}

  """
  def change_vote_voter(%VoteVoter{} = vote_voter, attrs \\ %{}) do
    VoteVoter.changeset(vote_voter, attrs)
  end

  alias Api.Database.Word

  @doc """
  Returns the list of words.

  ## Examples

      iex> list_words()
      [%Word{}, ...]

  """
  def list_words do
    Repo.all(Word)
  end

  @doc """
  Gets a single word.

  Raises `Ecto.NoResultsError` if the Word does not exist.

  ## Examples

      iex> get_word!(123)
      %Word{}

      iex> get_word!(456)
      ** (Ecto.NoResultsError)

  """
  def get_word!(id), do: Repo.get!(Word, id)

  @doc """
  Creates a word.

  ## Examples

      iex> create_word(%{field: value})
      {:ok, %Word{}}

      iex> create_word(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_word(attrs \\ %{}) do
    %Word{}
    |> Word.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a word.

  ## Examples

      iex> update_word(word, %{field: new_value})
      {:ok, %Word{}}

      iex> update_word(word, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_word(%Word{} = word, attrs) do
    word
    |> Word.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a word.

  ## Examples

      iex> delete_word(word)
      {:ok, %Word{}}

      iex> delete_word(word)
      {:error, %Ecto.Changeset{}}

  """
  def delete_word(%Word{} = word) do
    Repo.delete(word)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking word changes.

  ## Examples

      iex> change_word(word)
      %Ecto.Changeset{data: %Word{}}

  """
  def change_word(%Word{} = word, attrs \\ %{}) do
    Word.changeset(word, attrs)
  end
end
