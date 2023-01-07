defmodule Api.PagesFixtures do
  @moduledoc """
  This module defines test helpers for creating
  entities via the `Api.Pages` context.
  """

  @doc """
  Generate a page.
  """
  def page_fixture(attrs \\ %{}) do
    {:ok, page} =
      attrs
      |> Enum.into(%{
        name: "some name"
      })
      |> Api.Pages.create_page()

    page
  end
end
