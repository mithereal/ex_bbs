defmodule Api.Database.PostText do
  use Ecto.Schema
  import Ecto.Changeset

  schema "posts_text" do
    field :bbcode_uid, :string
    field :post_id, :integer
    field :post_subject, :string
    field :post_text, :string

    timestamps()
  end

  @doc false
  def changeset(post_text, attrs) do
    post_text
    |> cast(attrs, [:post_id, :bbcode_uid, :post_subject, :post_text])
    |> validate_required([:post_id, :bbcode_uid, :post_subject, :post_text])
  end
end
