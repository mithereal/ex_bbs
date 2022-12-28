defmodule Api.Database.PrivMsgText do
  use Ecto.Schema
  import Ecto.Changeset

  schema "privmsgs_text" do
    field :privmsgs_bbcode_uid, :string
    field :privmsgs_text, :string
    field :privmsgs_text_id, :integer

    timestamps()
  end

  @doc false
  def changeset(priv_msg_text, attrs) do
    priv_msg_text
    |> cast(attrs, [:privmsgs_text_id, :privmsgs_bbcode_uid, :privmsgs_text])
    |> validate_required([:privmsgs_text_id, :privmsgs_bbcode_uid, :privmsgs_text])
  end
end
