defmodule Api.System.Status do
  use Api.Schema
  import Ecto.Changeset

  schema "bbs_status" do
    field :key, :string
    field :title, :string
    field :type, :string
  end

end
