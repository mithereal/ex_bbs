defmodule Api.Database.Theme do
  use Ecto.Schema
  import Ecto.Changeset

  schema "themes" do
    field :img_size_poll, :integer
    field :body_hlink, :string
    field :span_class1, :string
    field :th_class1, :string
    field :style_name, :string
    field :head_stylesheet, :string
    field :fontsize1, :integer
    field :td_color3, :string
    field :body_alink, :string
    field :th_color3, :string
    field :span_class2, :string
    field :span_class3, :string
    field :fontcolor1, :string
    field :fontface1, :string
    field :fontsize3, :integer
    field :body_bgcolor, :string
    field :fontcolor2, :string
    field :fontface3, :string
    field :fontsize2, :integer
    field :td_color2, :string
    field :td_class2, :string
    field :tr_color1, :string
    field :body_link, :string
    field :th_color2, :string
    field :body_text, :string
    field :td_class1, :string
    field :themes_id, :string
    field :th_class2, :string
    field :th_color1, :string
    field :fontface2, :string
    field :tr_class1, :string
    field :tr_class3, :string
    field :tr_color2, :string
    field :th_class3, :string
    field :tr_class2, :string
    field :template_name, :string
    field :td_class3, :string
    field :body_background, :string
    field :fontcolor3, :string
    field :td_color1, :string
    field :img_size_privmsg, :integer
    field :body_vlink, :string
    field :tr_color3, :string

    timestamps()
  end

  @doc false
  def changeset(theme, attrs) do
    theme
    |> cast(attrs, [:themes_id, :style_name, :template_name, :head_stylesheet, :body_background, :body_bgcolor, :body_text, :body_link, :body_vlink, :body_alink, :body_hlink, :tr_color1, :tr_color2, :tr_color3, :tr_class1, :tr_class2, :tr_class3, :th_color1, :th_color2, :th_color3, :th_class1, :th_class2, :th_class3, :td_color1, :td_color2, :td_color3, :td_class1, :td_class2, :td_class3, :fontface1, :fontface2, :fontface3, :fontsize1, :fontsize2, :fontsize3, :fontcolor1, :fontcolor2, :fontcolor3, :span_class1, :span_class2, :span_class3, :img_size_poll, :img_size_privmsg])
    |> validate_required([:themes_id, :style_name, :template_name, :head_stylesheet, :body_background, :body_bgcolor, :body_text, :body_link, :body_vlink, :body_alink, :body_hlink, :tr_color1, :tr_color2, :tr_color3, :tr_class1, :tr_class2, :tr_class3, :th_color1, :th_color2, :th_color3, :th_class1, :th_class2, :th_class3, :td_color1, :td_color2, :td_color3, :td_class1, :td_class2, :td_class3, :fontface1, :fontface2, :fontface3, :fontsize1, :fontsize2, :fontsize3, :fontcolor1, :fontcolor2, :fontcolor3, :span_class1, :span_class2, :span_class3, :img_size_poll, :img_size_privmsg])
  end
end
