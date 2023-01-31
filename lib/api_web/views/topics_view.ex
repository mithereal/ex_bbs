defmodule ApiWeb.TopicsView do
  use ApiWeb, :view


  alias Api.{
    Stars,
    Collections,
    Topics,
    Accounts,
    Posts
    }

  @doc """
  has_starred
  """
  def has_starred?(clauses) do
    if is_nil(Keyword.get(clauses, :user)), do: false, else: Stars.has_starred?(clauses)
  end

  @doc """
  has_collected
  """
  def has_collected?(current_user, topic) do
    if is_nil(current_user),
       do: false,
       else: Collections.has_collected?(user: current_user, topic: topic)
  end

  @doc """
  get_topic_count
  """
  def get_topic_count do
    Topics.get_total_topic_count()
  end

  @doc """
  get_reply_count
  """
  def get_reply_count do
    Posts.get_total_reply_count()
  end

  @doc """
  get_user_count
  """
  def get_user_count do
    Accounts.get_total_user_count()
  end

  @doc """
  popular
  """
  def popular(reply) do
    if reply.star_count >= 5, do: "popular"
  end
end
