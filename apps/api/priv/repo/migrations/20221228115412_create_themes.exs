defmodule Api.Repo.Migrations.CreateThemes do
  use Ecto.Migration

  def change do
    create table(:themes) do
      add :themes_id, :string
      add :style_name, :string
      add :template_name, :string
      add :head_stylesheet, :string
      add :body_background, :string
      add :body_bgcolor, :string
      add :body_text, :string
      add :body_link, :string
      add :body_vlink, :string
      add :body_alink, :string
      add :body_hlink, :string
      add :tr_color1, :string
      add :tr_color2, :string
      add :tr_color3, :string
      add :tr_class1, :string
      add :tr_class2, :string
      add :tr_class3, :string
      add :th_color1, :string
      add :th_color2, :string
      add :th_color3, :string
      add :th_class1, :string
      add :th_class2, :string
      add :th_class3, :string
      add :td_color1, :string
      add :td_color2, :string
      add :td_color3, :string
      add :td_class1, :string
      add :td_class2, :string
      add :td_class3, :string
      add :fontface1, :string
      add :fontface2, :string
      add :fontface3, :string
      add :fontsize1, :integer
      add :fontsize2, :integer
      add :fontsize3, :integer
      add :fontcolor1, :string
      add :fontcolor2, :string
      add :fontcolor3, :string
      add :span_class1, :string
      add :span_class2, :string
      add :span_class3, :string
      add :img_size_poll, :integer
      add :img_size_privmsg, :integer

      timestamps()
    end
  end
end
