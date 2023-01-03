defmodule Api.Bbs.Schema.SearchResult do
  use Ecto.Schema
  import Ecto.Changeset

  schema "search_results" do
    field :search_array, :string
    field :search_id, :integer
    field :search_time, :integer
    field :session_id, :integer

    timestamps()
  end

  @doc false
  def changeset(search_result, attrs) do
    search_result
    |> cast(attrs, [:search_id, :session_id, :search_time, :search_array])
    |> validate_required([:search_id, :session_id, :search_time, :search_array])
  end
end
