defmodule Api.Forum.Posts do
  use Api.Schema
  import Ecto.Changeset

  alias  Api.Forum.Topics

  schema "bbs_posts" do
    field :body, :string
    field :description, :string
    field :edit_count, :integer
    field :status, :integer
    field :title, :string
    field :username, :string

    belongs_to :topic, Topics

    timestamps()
  end

  @doc false
  def changeset(posts, attrs) do
    posts
    |> cast(attrs, [:id, :title, :description, :status, :username, :edit_count, :body])
    |> put_assoc(:topic, required: false)
    |> validate_required([:id, :title, :description, :status, :username, :edit_count, :body])

  end
end
