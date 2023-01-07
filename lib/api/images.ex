defmodule Api.Images do
  @moduledoc """
  The Images context.
  """
  require Logger
  import Ecto.Query, warn: false
  alias Api.Repo

  alias Api.Images.Image

  @doc """
  Returns the list of products.

  ## Examples

      iex> list_products()
      [%Image{}, ...]

  """

  def list_products() do
    Image
    |> Repo.all()
    |> Repo.preload(:main_image)
    |> Repo.preload(:images)
  end

  def list_products(params) do
    from(
      p in Image,
      order_by: ^filter_order_by(params["order_by"])
    )
    |> Repo.all()
    |> Repo.preload(:main_image)
    |> Repo.preload(:images)
  end

  @doc """
  Returns the list of products ordered by orders count.

  ## Examples

      iex> list_top_products()
      [%Image{}, ...]

  """
  def list_top_products() do
    Image |> Repo.all() |> Repo.preload(:main_image) |> Repo.preload(:images)
  end

  # defp filter_order_by("name_desc"), do: [desc: dynamic([p], p.name)]
  # defp filter_order_by("name_asc"), do: [asc: dynamic([p], p.name)]
  # defp filter_order_by("price_desc"), do: [desc: dynamic([p], p.price)]
  # defp filter_order_by("price_asc"), do: [asc: dynamic([p], p.price)]
  defp filter_order_by("name_desc"), do: [desc: :name]
  defp filter_order_by("name_asc"), do: [asc: :name]
  defp filter_order_by("price_desc"), do: [desc: :price]
  defp filter_order_by("price_asc"), do: [asc: :price]
  defp filter_order_by(_), do: []

  @doc """
  Returns the list of products matching fuzzy search.

  ## Examples

      iex> search_products()
      [%Image{}, ...]

  """
  def search_products(search_phrase) do
    start_character = String.slice(search_phrase, 0..1)

    from(
      p in Image,
      where: ilike(p.name, ^"#{start_character}%"),
      where: fragment("SIMILARITY(?, ?) > 0", p.name, ^search_phrase),
      order_by: fragment("LEVENSHTEIN(?, ?)", p.name, ^search_phrase)
    )
    |> Repo.all()
  end

  @doc """
  Gets a single product.

  Raises `Ecto.NoResultsError` if the Image does not exist.

  ## Examples

      iex> get_product!(123)
      %Image{}

      iex> get_product!(456)
      ** (Ecto.NoResultsError)

  """
  def get_product!(id),
    do:
      Repo.get!(Image, id)
      |> Repo.preload(:main_image)
      |> Repo.preload(:images)

  def get_product_by_slug(slug),
    do:
      Repo.get_by(Image, slug: slug)
      |> Repo.preload(:main_image)
      |> Repo.preload(:images)

  def get_product_by_slug!(slug),
    do:
      Repo.get_by!(Image, slug: slug)
      |> Repo.preload(:main_image)
      |> Repo.preload(:images)

  @doc """
  Creates a product.

  ## Examples

      iex> create_product(%{field: value})
      {:ok, %Image{}}

      iex> create_product(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_product(attrs \\ %{}) do
    %Image{}
    |> Image.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a product.

  ## Examples

      iex> update_product(product, %{field: new_value})
      {:ok, %Image{}}

      iex> update_product(product, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_product(%Image{} = product, attrs) do
    product
    |> Image.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a product.

  ## Examples

      iex> delete_product(product)
      {:ok, %Image{}}

      iex> delete_product(product)
      {:error, %Ecto.Changeset{}}

  """
  def delete_product(%Image{} = product) do
    Repo.delete(product)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking product changes.

  ## Examples

      iex> change_product(product)
      %Ecto.Changeset{data: %Image{}}

  """
  def change_product(%Image{} = product, attrs \\ %{}) do
    Image.changeset(product, attrs)
  end

  def import_projects(response \\ %{}) do
    Logger.info("Importing Projects")

    # read all of product dir into a array
    files =
      Path.wildcard("./priv/static/projects/*.zip")
      |> Enum.map(fn x ->
        # Unzip.LocalFile implements Unzip.FileAccess
        zip_file = Unzip.LocalFile.open(x)

        # `new` reads list of files by reading central directory found at the end of the zip
        {:ok, unzip} = Unzip.new(zip_file)

        # presents already read files metadata
        file_entries = Unzip.list_entries(unzip)

        screenshot_entries =
          Enum.filter(file_entries, fn x -> String.match?(x.file_name, ~r/screenshots\/./) end)

        filename = Path.basename(x)

        prefix = Path.basename(x, ".zip")

        name =
          Path.basename(x, ".zip")
          |> String.replace("_", " ")

        Unzip.file_stream!(unzip, "README.md")
        |> Stream.into(File.stream!("/tmp/#{prefix}-README"))
        |> Stream.run()

        Unzip.file_stream(unzip, "catalog.yml")
        |> Stream.into(File.stream!("/tmp/#{prefix}-catalog.yml"))
        |> Stream.run()

        images =
          Enum.map(screenshot_entries, fn x ->
            name = Path.basename(x.file_name)
            file_path = "priv/static/images/#{prefix}_#{name}"

            Unzip.file_stream!(unzip, x.file_name)
            |> Stream.into(File.stream!(file_path))
            |> Stream.run()

            Path.basename(file_path)
          end)

        markdown = File.read!("/tmp/#{prefix}-README")

        price = load_price_from_yml("/tmp/#{prefix}-catalog.yml")

        html = Earmark.as_html!(markdown)
        ast = Earmark.as_ast!(markdown)

        {"p", [], summary_list, %{}} = Enum.at(ast, 1)

        summary = List.first(summary_list)

        attrs = %{
          description: summary,
          link: filename,
          name: name,
          images: images,
          price: price,
          type: "file"
        }

        %Image{}
        |> Image.changeset(attrs)
        |> Repo.insert()
      end)

    response
  end

  defp load_price_from_yml(path \\ "catalog.yml") do
    data =
      path
      |> Path.expand()
      |> YamlElixir.read_from_file()

    case data do
      {:ok, data} -> data["price"]
      error -> 0.0
    end
  end

  alias Api.Images.Image

  @doc """
  Returns the list of images.

  ## Examples

      iex> list_images()
      [%Image{}, ...]

  """
  def list_images do
    Repo.all(Image)
  end

  @doc """
  Gets a single image.

  Raises `Ecto.NoResultsError` if the Image does not exist.

  ## Examples

      iex> get_image!(123)
      %Image{}

      iex> get_image!(456)
      ** (Ecto.NoResultsError)

  """
  def get_image!(id), do: Repo.get!(Image, id)

  @doc """
  Creates a image.

  ## Examples

      iex> create_image(%{field: value})
      {:ok, %Image{}}

      iex> create_image(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_image(attrs \\ %{}) do
    %Image{}
    |> Image.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a image.

  ## Examples

      iex> update_image(image, %{field: new_value})
      {:ok, %Image{}}

      iex> update_image(image, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_image(%Image{} = image, attrs) do
    image
    |> Image.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a image.

  ## Examples

      iex> delete_image(image)
      {:ok, %Image{}}

      iex> delete_image(image)
      {:error, %Ecto.Changeset{}}

  """
  def delete_image(%Image{} = image) do
    Repo.delete(image)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking image changes.

  ## Examples

      iex> change_image(image)
      %Ecto.Changeset{data: %Image{}}

  """
  def change_image(%Image{} = image, attrs \\ %{}) do
    Image.changeset(image, attrs)
  end
end
