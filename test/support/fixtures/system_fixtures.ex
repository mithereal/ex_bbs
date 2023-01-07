defmodule Api.SystemFixtures do
  @moduledoc """
  This module defines test helpers for creating
  entities via the `Api.System` context.
  """

  @doc """
  Generate a setting.
  """
  def setting_fixture(attrs \\ %{}) do
    {:ok, setting} =
      attrs
      |> Enum.into(%{
        key: "some key",
        name: "some name",
        type: "some type",
        value: "some value"
      })
      |> Api.System.create_setting()

    setting
  end
end
