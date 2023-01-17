defmodule Api.Forum.Posts do
  use Ecto.Schema
  import Ecto.Changeset

  schema "posts" do
    field :body, :string
    field :description, :string
    field :edit_count, :integer
    field :id, Ecto.UUID
    field :status, :integer
    field :title, :string
    field :username, :string

    timestamps()
  end

  @doc false
  def changeset(posts, attrs) do
    posts
    |> cast(attrs, [:id, :title, :description, :status, :username, :edit_count, :body])
    |> validate_required([:id, :title, :description, :status, :username, :edit_count, :body])
  end
end
