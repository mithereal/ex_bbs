defmodule Api.Bbs.Schema.ThemeName do
  use Ecto.Schema
  import Ecto.Changeset

  schema "themes_name" do
    field :fontcolor1_name, :string
    field :fontcolor2_name, :string
    field :fontcolor3_name, :string
    field :fontface1_name, :string
    field :fontface2_name, :string
    field :fontface3_name, :string
    field :fontsize1_name, :string
    field :fontsize2_name, :string
    field :fontsize3_name, :string
    field :span_class1_name, :string
    field :span_class2_name, :string
    field :span_class3_name, :string
    field :td_class1_name, :string
    field :td_class2_name, :string
    field :td_class3_name, :string
    field :td_color1_name, :string
    field :td_color2_name, :string
    field :td_color3_name, :string
    field :th_class1_name, :string
    field :th_class2_name, :string
    field :th_class3_name, :string
    field :th_color1_name, :string
    field :th_color2_name, :string
    field :th_color3_name, :string
    field :themes_id, :integer
    field :tr_class1_name, :string
    field :tr_class2_name, :string
    field :tr_class3_name, :string
    field :tr_color1_name, :string
    field :tr_color2_name, :string
    field :tr_color3_name, :string

    timestamps()
  end

  @doc false
  def changeset(theme_name, attrs) do
    theme_name
    |> cast(attrs, [:themes_id, :tr_color1_name, :tr_color2_name, :tr_color3_name, :tr_class1_name, :tr_class2_name, :tr_class3_name, :th_color1_name, :th_color2_name, :th_color3_name, :th_class1_name, :th_class2_name, :th_class3_name, :td_color1_name, :td_color2_name, :td_color3_name, :td_class1_name, :td_class2_name, :td_class3_name, :fontface1_name, :fontface2_name, :fontface3_name, :fontsize1_name, :fontsize2_name, :fontsize3_name, :fontcolor1_name, :fontcolor2_name, :fontcolor3_name, :span_class1_name, :span_class2_name, :span_class3_name])
    |> validate_required([:themes_id, :tr_color1_name, :tr_color2_name, :tr_color3_name, :tr_class1_name, :tr_class2_name, :tr_class3_name, :th_color1_name, :th_color2_name, :th_color3_name, :th_class1_name, :th_class2_name, :th_class3_name, :td_color1_name, :td_color2_name, :td_color3_name, :td_class1_name, :td_class2_name, :td_class3_name, :fontface1_name, :fontface2_name, :fontface3_name, :fontsize1_name, :fontsize2_name, :fontsize3_name, :fontcolor1_name, :fontcolor2_name, :fontcolor3_name, :span_class1_name, :span_class2_name, :span_class3_name])
  end
end
