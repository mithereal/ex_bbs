defmodule Api.Repo.Migrations.CreateThemesName do
  use Ecto.Migration

  def change do
    create table(:themes_name) do
      add :themes_id, :integer
      add :tr_color1_name, :string
      add :tr_color2_name, :string
      add :tr_color3_name, :string
      add :tr_class1_name, :string
      add :tr_class2_name, :string
      add :tr_class3_name, :string
      add :th_color1_name, :string
      add :th_color2_name, :string
      add :th_color3_name, :string
      add :th_class1_name, :string
      add :th_class2_name, :string
      add :th_class3_name, :string
      add :td_color1_name, :string
      add :td_color2_name, :string
      add :td_color3_name, :string
      add :td_class1_name, :string
      add :td_class2_name, :string
      add :td_class3_name, :string
      add :fontface1_name, :string
      add :fontface2_name, :string
      add :fontface3_name, :string
      add :fontsize1_name, :string
      add :fontsize2_name, :string
      add :fontsize3_name, :string
      add :fontcolor1_name, :string
      add :fontcolor2_name, :string
      add :fontcolor3_name, :string
      add :span_class1_name, :string
      add :span_class2_name, :string
      add :span_class3_name, :string

      timestamps()
    end
  end
end
