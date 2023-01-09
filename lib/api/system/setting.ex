defmodule Api.System.Setting do
  use Api.Schema
  import Ecto.Changeset

  schema "bbs_settings" do
    field :key, :string
    field :name, :string
    field :type, :string
    field :value, :string

    timestamps()
  end

  @doc false
  def changeset(setting, attrs) do
    setting
    |> cast(attrs, [:name, :key, :value, :type])
    |> validate_required([:name, :key, :value, :type])
    |> unique_constraint(:key)
  end


  def defaults() do
    [
      %{key: "attachment_quota", name: "attachment quota", type: "integer", value: "52428800"},
      %{key: "avatar_filesize", name: "avatar_filesize", type: "integer", value: "262144"},
      %{key: "avatar_max_height", name: "avatar_max_height", type: "integer", value: "120"},
      %{key: "avatar_max_width", name: "avatar_max_width", type: "integer", value: "120"},
      %{key: "avatar_min_height", name: "avatar_min_height", type: "integer", value: "40"},
      %{key: "avatar_min_width", name: "avatar_min_width", type: "integer", value: "40"},
      %{
        key: "board_contact_email",
        name: "board_contact_email",
        type: "string",
        value: "board_contact_email@localhost"
      },
      %{
        key: "board_contact_name",
        name: "board_contact",
        type: "string",
        value: "board_contact_name"
      },
      %{key: "board_disable", name: "board_disable", type: "boolean", value: "false"},
      %{
        key: "board_disable_msg",
        name: "board_disable_msg",
        type: "string",
        value: "The Board is Disabled"
      },
      %{key: "board_email", name: "board_email", type: "string", value: "board_email@localhost"},
      %{
        key: "board_email_sig",
        name: "board_email_sig",
        type: "string",
        value: "board_email_sig"
      },
      %{
        key: "board_start_epoch",
        name: "board_start_epoch",
        type: "integer",
        value: "1673171597"
      },
      %{
        key: "display_unapproved_posts",
        name: "display_unapproved_posts",
        type: "boolean",
        value: "false"
      },
      %{key: "feed_enable", name: "feed_enable", type: "boolean", value: "false"},
      %{key: "flood_interval", name: "flood_interval", type: "integer", value: "15"},
      %{
        key: "board_img_create_thumbnail",
        name: "img_create_thumbnail",
        type: "boolean",
        value: "true"
      },
      %{
        key: "board_img_thumbnail_width",
        name: "board_img_thumbnail_width",
        type: "integer",
        value: "250"
      },
      %{
        key: "board_img_thumbnail_height",
        name: "board_img_thumbnail_height",
        type: "integer",
        value: "250"
      },
      %{
        key: "gallery_thumbnail_width",
        name: "gallery_thumbnail_width",
        type: "integer",
        value: "250"
      },
      %{
        key: "gallery_thumbnail_height",
        name: "gallery_thumbnail_height",
        type: "integer",
        value: "250"
      },
      %{key: "topics_per_page", name: "topics_per_page", type: "integer", value: "20"},
      %{key: "posts_per_page", name: "posts_per_page", type: "integer", value: "20"},
      %{key: "require_activation", name: "require_activation", type: "boolean", value: "false"},
      %{key: "max_attachments", name: "max_attachments", type: "integer", value: "20"},
      %{key: "max_attachments_pm", name: "max_attachments_pm", type: "integer", value: "20"}
    ]
  end
end
