defmodule Api.Forum.Forums do
  use Api.Schema
  import Ecto.Changeset
  alias Api.Forum.Categories
  alias Api.Forum.Forums.TitleSlug
  alias Api.Forum.Topics
  alias Api.Accounts.User
  alias Api.System.Status

  schema "bbs_forums" do
    field :description, :string
    field :order, :integer
    field :title, :string

    belongs_to :status, Status, foreign_key: :status_id
    belongs_to :users, User, foreign_key: :user_id
    belongs_to :categories, Categories, foreign_key: :category_id
    has_many :topics, Topics, foreign_key: :topic_id

    field :slug, TitleSlug.Type

    belongs_to(:performer, Terminator.UUID.Performer)

    timestamps()
  end

  @doc false
  def changeset(forums, attrs) do
    forums
    |> cast(attrs, [ :title, :description, :order])
    |> cast_assoc(:topics, required: false, with: &Topics.changeset/2)
    |> put_assoc(:categories, attrs.category)
    |> put_assoc(:users, attrs.user)
    |> put_assoc(:status, attrs.status)
    |> unique_constraint(:title)
    |> TitleSlug.maybe_generate_slug()
    |> TitleSlug.unique_constraint()
    |> validate_required([:title, :description])

  end

  defp create_performer(%{valid?: true} = changeset) do
    {:ok, performer} = %Terminator.UUID.Performer{} |> Terminator.UUID.Repo.insert()

    changeset
    |> put_change(:performer_id, performer.id)
  end
end

