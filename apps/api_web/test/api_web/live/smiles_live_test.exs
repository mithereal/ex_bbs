defmodule ApiWeb.SmilesLiveTest do
  use ApiWeb.ConnCase

  import Phoenix.LiveViewTest
  import Api.Bbs.SchemaFixtures

  @create_attrs %{code: "some code", emoticon: "some emoticon", smile_url: "some smile_url", smilies_id: 42}
  @update_attrs %{code: "some updated code", emoticon: "some updated emoticon", smile_url: "some updated smile_url", smilies_id: 43}
  @invalid_attrs %{code: nil, emoticon: nil, smile_url: nil, smilies_id: nil}

  defp create_smiles(_) do
    smiles = smiles_fixture()
    %{smiles: smiles}
  end

  describe "Index" do
    setup [:create_smiles]

    test "lists all smiles", %{conn: conn, smiles: smiles} do
      {:ok, _index_live, html} = live(conn, Routes.smiles_index_path(conn, :index))

      assert html =~ "Listing Smiles"
      assert html =~ smiles.code
    end

    test "saves new smiles", %{conn: conn} do
      {:ok, index_live, _html} = live(conn, Routes.smiles_index_path(conn, :index))

      assert index_live |> element("a", "New Smiles") |> render_click() =~
               "New Smiles"

      assert_patch(index_live, Routes.smiles_index_path(conn, :new))

      assert index_live
             |> form("#smiles-form", smiles: @invalid_attrs)
             |> render_change() =~ "can&#39;t be blank"

      {:ok, _, html} =
        index_live
        |> form("#smiles-form", smiles: @create_attrs)
        |> render_submit()
        |> follow_redirect(conn, Routes.smiles_index_path(conn, :index))

      assert html =~ "Smiles created successfully"
      assert html =~ "some code"
    end

    test "updates smiles in listing", %{conn: conn, smiles: smiles} do
      {:ok, index_live, _html} = live(conn, Routes.smiles_index_path(conn, :index))

      assert index_live |> element("#smiles-#{smiles.id} a", "Edit") |> render_click() =~
               "Edit Smiles"

      assert_patch(index_live, Routes.smiles_index_path(conn, :edit, smiles))

      assert index_live
             |> form("#smiles-form", smiles: @invalid_attrs)
             |> render_change() =~ "can&#39;t be blank"

      {:ok, _, html} =
        index_live
        |> form("#smiles-form", smiles: @update_attrs)
        |> render_submit()
        |> follow_redirect(conn, Routes.smiles_index_path(conn, :index))

      assert html =~ "Smiles updated successfully"
      assert html =~ "some updated code"
    end

    test "deletes smiles in listing", %{conn: conn, smiles: smiles} do
      {:ok, index_live, _html} = live(conn, Routes.smiles_index_path(conn, :index))

      assert index_live |> element("#smiles-#{smiles.id} a", "Delete") |> render_click()
      refute has_element?(index_live, "#smiles-#{smiles.id}")
    end
  end

  describe "Show" do
    setup [:create_smiles]

    test "displays smiles", %{conn: conn, smiles: smiles} do
      {:ok, _show_live, html} = live(conn, Routes.smiles_show_path(conn, :show, smiles))

      assert html =~ "Show Smiles"
      assert html =~ smiles.code
    end

    test "updates smiles within modal", %{conn: conn, smiles: smiles} do
      {:ok, show_live, _html} = live(conn, Routes.smiles_show_path(conn, :show, smiles))

      assert show_live |> element("a", "Edit") |> render_click() =~
               "Edit Smiles"

      assert_patch(show_live, Routes.smiles_show_path(conn, :edit, smiles))

      assert show_live
             |> form("#smiles-form", smiles: @invalid_attrs)
             |> render_change() =~ "can&#39;t be blank"

      {:ok, _, html} =
        show_live
        |> form("#smiles-form", smiles: @update_attrs)
        |> render_submit()
        |> follow_redirect(conn, Routes.smiles_show_path(conn, :show, smiles))

      assert html =~ "Smiles updated successfully"
      assert html =~ "some updated code"
    end
  end
end
