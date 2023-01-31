defmodule Api.Posts.Queries do
  @moduledoc false

  import Ecto.Query
  alias Api.Posts.Post

  @doc """
  Returns the list posts.
  """
  @spec list_posts :: Ecto.Query.t()
  def list_posts, do: Post

  @doc """
  Filter the list of posts.

  ## Examples

      iex> cond_posts(params)
      Ecto.Query.t()

      iex> cond_posts(params, user: %User{})
      Ecto.Query.t()

  """
  @spec cond_posts(Keyword.t()) :: Ecto.Query.t()
  def cond_posts(opts) do
    opts
    |> filter_from_clauses
    |> preload([:topic, :user])
  end

  defp filter_from_clauses(opts) do
    cond do
      Keyword.has_key?(opts, :user) -> opts |> Keyword.get(:user) |> Post.by_user()
      Keyword.has_key?(opts, :topic) -> opts |> Keyword.get(:topic) |> Post.by_topic()
      true -> Post
    end
  end
end
