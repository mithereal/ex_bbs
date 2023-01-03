defmodule Api.Bbs.Schema.PrivMsg do
  use Ecto.Schema
  import Ecto.Changeset

  schema "privmsgs" do
    field :privmsgs_attach_sig, :integer
    field :privmsgs_date, :integer
    field :privmsgs_enable_bbcode, :integer
    field :privmsgs_enable_html, :integer
    field :privmsgs_enable_smilies, :integer
    field :privmsgs_from_userid, :integer
    field :privmsgs_id, :integer
    field :privmsgs_ip, :string
    field :privmsgs_subject, :string
    field :privmsgs_to_userid, :integer
    field :privmsgs_type, :integer

    timestamps()
  end

  @doc false
  def changeset(priv_msg, attrs) do
    priv_msg
    |> cast(attrs, [:privmsgs_id, :privmsgs_type, :privmsgs_subject, :privmsgs_from_userid, :privmsgs_to_userid, :privmsgs_date, :privmsgs_ip, :privmsgs_enable_bbcode, :privmsgs_enable_html, :privmsgs_enable_smilies, :privmsgs_attach_sig])
    |> validate_required([:privmsgs_id, :privmsgs_type, :privmsgs_subject, :privmsgs_from_userid, :privmsgs_to_userid, :privmsgs_date, :privmsgs_ip, :privmsgs_enable_bbcode, :privmsgs_enable_html, :privmsgs_enable_smilies, :privmsgs_attach_sig])
  end
end
