defmodule ApiWeb.Filter do
  @words ~w(password password_repeat passwordRepeat password_confirmation passwordConfirmation bearer)a

  def filter_headers(conn) do
    for {key, value} = tuple <- conn.req_headers, into: %{} do
      case key do
        "authorization" ->
          {key, filter_str(value, 16)}

        _ ->
          tuple
      end
    end
  end

  def filter_params(params) when is_map(params) do
    for {key, value} = tuple <- params, into: %{} do
      case key do
        k when k in @words ->
          {key, filter_str(value)}

        "user" when is_map(value) ->
          {key, filter_params(value)}

        _ ->
          tuple
      end
    end
  end

  def filter_params(params), do: params

  def filter_str(str, length_to_keep \\ 0) do
    "#{String.slice(str, 0, length_to_keep)}********* [FILTERED]"
  end
end
