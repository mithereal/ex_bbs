defmodule Api.ForumFixtures do
  @moduledoc """
  This module defines test helpers for creating
  entities via the `Api.Forum` context.
  """

  @doc """
  Generate a forums.
  """
  def forums_fixture(attrs \\ %{}) do
    {:ok, forums} =
      attrs
      |> Enum.into(%{
        description: "some description",
        id: "7488a646-e31f-11e4-aace-600308960662",
        order: 42,
        status: 42,
        title: "some title"
      })
      |> Api.Forum.create_forums()

    forums
  end

  @doc """
  Generate a categories.
  """
  def categories_fixture(attrs \\ %{}) do
    {:ok, categories} =
      attrs
      |> Enum.into(%{
        description: "some description",
        id: "7488a646-e31f-11e4-aace-600308960662",
        order: 42,
        status: 42,
        title: "some title"
      })
      |> Api.Forum.create_categories()

    categories
  end

  @doc """
  Generate a topics.
  """
  def topics_fixture(attrs \\ %{}) do
    {:ok, topics} =
      attrs
      |> Enum.into(%{
        description: "some description",
        id: "7488a646-e31f-11e4-aace-600308960662",
        status: 42,
        title: "some title"
      })
      |> Api.Forum.create_topics()

    topics
  end

  @doc """
  Generate a posts.
  """
  def posts_fixture(attrs \\ %{}) do
    {:ok, posts} =
      attrs
      |> Enum.into(%{
        body: "some body",
        description: "some description",
        edit_count: 42,
        id: "7488a646-e31f-11e4-aace-600308960662",
        status: 42,
        title: "some title",
        username: "some username"
      })
      |> Api.Forum.create_posts()

    posts
  end

  @doc """
  Generate a status.
  """
  def status_fixture(attrs \\ %{}) do
    {:ok, status} =
      attrs
      |> Enum.into(%{
        id: "7488a646-e31f-11e4-aace-600308960662",
        title: "some title",
        type: "some type"
      })
      |> Api.Forum.create_status()

    status
  end
end
