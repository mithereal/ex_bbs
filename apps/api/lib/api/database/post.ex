defmodule Api.Database.Post do
  use Ecto.Schema
  import Ecto.Changeset

  schema "posts" do
    field :enable_bbcode, :integer
    field :enable_html, :integer
    field :enable_sig, :integer
    field :enable_smilies, :integer
    field :forum_id, :integer
    field :post_edit_count, :integer
    field :post_edit_time, :integer
    field :post_id, :integer
    field :post_time, :integer
    field :post_username, :string
    field :poster_id, :integer
    field :poster_ip, :string
    field :topic_id, :integer

    timestamps()
  end

  @doc false
  def changeset(post, attrs) do
    post
    |> cast(attrs, [:post_id, :topic_id, :forum_id, :poster_id, :post_time, :post_username, :poster_ip, :enable_bbcode, :enable_html, :enable_smilies, :enable_sig, :post_edit_time, :post_edit_count])
    |> validate_required([:post_id, :topic_id, :forum_id, :poster_id, :post_time, :post_username, :poster_ip, :enable_bbcode, :enable_html, :enable_smilies, :enable_sig, :post_edit_time, :post_edit_count])
  end
end
