defmodule ApiWeb.VoteVoterLiveTest do
  use ApiWeb.ConnCase

  import Phoenix.LiveViewTest
  import Api.DatabaseFixtures

  @create_attrs %{vote_id: 42, vote_user_id: 42, vote_user_ip: "some vote_user_ip"}
  @update_attrs %{vote_id: 43, vote_user_id: 43, vote_user_ip: "some updated vote_user_ip"}
  @invalid_attrs %{vote_id: nil, vote_user_id: nil, vote_user_ip: nil}

  defp create_vote_voter(_) do
    vote_voter = vote_voter_fixture()
    %{vote_voter: vote_voter}
  end

  describe "Index" do
    setup [:create_vote_voter]

    test "lists all vote_voters", %{conn: conn, vote_voter: vote_voter} do
      {:ok, _index_live, html} = live(conn, Routes.vote_voter_index_path(conn, :index))

      assert html =~ "Listing Vote voters"
      assert html =~ vote_voter.vote_user_ip
    end

    test "saves new vote_voter", %{conn: conn} do
      {:ok, index_live, _html} = live(conn, Routes.vote_voter_index_path(conn, :index))

      assert index_live |> element("a", "New Vote voter") |> render_click() =~
               "New Vote voter"

      assert_patch(index_live, Routes.vote_voter_index_path(conn, :new))

      assert index_live
             |> form("#vote_voter-form", vote_voter: @invalid_attrs)
             |> render_change() =~ "can&#39;t be blank"

      {:ok, _, html} =
        index_live
        |> form("#vote_voter-form", vote_voter: @create_attrs)
        |> render_submit()
        |> follow_redirect(conn, Routes.vote_voter_index_path(conn, :index))

      assert html =~ "Vote voter created successfully"
      assert html =~ "some vote_user_ip"
    end

    test "updates vote_voter in listing", %{conn: conn, vote_voter: vote_voter} do
      {:ok, index_live, _html} = live(conn, Routes.vote_voter_index_path(conn, :index))

      assert index_live |> element("#vote_voter-#{vote_voter.id} a", "Edit") |> render_click() =~
               "Edit Vote voter"

      assert_patch(index_live, Routes.vote_voter_index_path(conn, :edit, vote_voter))

      assert index_live
             |> form("#vote_voter-form", vote_voter: @invalid_attrs)
             |> render_change() =~ "can&#39;t be blank"

      {:ok, _, html} =
        index_live
        |> form("#vote_voter-form", vote_voter: @update_attrs)
        |> render_submit()
        |> follow_redirect(conn, Routes.vote_voter_index_path(conn, :index))

      assert html =~ "Vote voter updated successfully"
      assert html =~ "some updated vote_user_ip"
    end

    test "deletes vote_voter in listing", %{conn: conn, vote_voter: vote_voter} do
      {:ok, index_live, _html} = live(conn, Routes.vote_voter_index_path(conn, :index))

      assert index_live |> element("#vote_voter-#{vote_voter.id} a", "Delete") |> render_click()
      refute has_element?(index_live, "#vote_voter-#{vote_voter.id}")
    end
  end

  describe "Show" do
    setup [:create_vote_voter]

    test "displays vote_voter", %{conn: conn, vote_voter: vote_voter} do
      {:ok, _show_live, html} = live(conn, Routes.vote_voter_show_path(conn, :show, vote_voter))

      assert html =~ "Show Vote voter"
      assert html =~ vote_voter.vote_user_ip
    end

    test "updates vote_voter within modal", %{conn: conn, vote_voter: vote_voter} do
      {:ok, show_live, _html} = live(conn, Routes.vote_voter_show_path(conn, :show, vote_voter))

      assert show_live |> element("a", "Edit") |> render_click() =~
               "Edit Vote voter"

      assert_patch(show_live, Routes.vote_voter_show_path(conn, :edit, vote_voter))

      assert show_live
             |> form("#vote_voter-form", vote_voter: @invalid_attrs)
             |> render_change() =~ "can&#39;t be blank"

      {:ok, _, html} =
        show_live
        |> form("#vote_voter-form", vote_voter: @update_attrs)
        |> render_submit()
        |> follow_redirect(conn, Routes.vote_voter_show_path(conn, :show, vote_voter))

      assert html =~ "Vote voter updated successfully"
      assert html =~ "some updated vote_user_ip"
    end
  end
end
