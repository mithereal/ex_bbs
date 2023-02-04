defmodule ApiWeb.TeamView do
  use ApiWeb, :view

  def is_owner?(team, user) do
    team.owner_id == user.id
  end
end
