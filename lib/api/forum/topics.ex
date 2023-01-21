defmodule Api.Forum.Topics do
  use Api.Schema
  import Ecto.Changeset

  alias  Api.Forum.Forums
  alias  Api.Forum.Posts

  schema "bbs_topics" do
    field :description, :string
    field :status, :integer
    field :title, :string

    belongs_to :forums, Forums
    has_many :posts, Posts

    timestamps()
  end

  @doc false
  def changeset(topics, attrs) do
    topics
    |> cast(attrs, [:id, :title, :description, :status])
    |> cast_assoc(:posts, required: false)
    |> put_assoc(:forums, required: false)
    |> validate_required([:id, :title, :description, :status])
  end
end
