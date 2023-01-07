defmodule ApiWeb.ProductController do
  use ApiWeb, :controller

  def show(conn, %{"name" => name}) do
    name = name <> ".zip"
    data = Api.Product.show(name)
    {_, data} = :ets.lookup(data.ref, :default) |> List.first()
    render(conn, "show.json", data: data)
  end

  def index(conn, _) do
    products =
      Api.Product.Supervisor.list()
      |> Enum.map(fn service ->
        {_, data} = :ets.lookup(String.to_atom(service), :default) |> List.first()
        data
      end)

    render(conn, "index.json", products: products)
  end
end
