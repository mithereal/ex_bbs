defmodule ApiWeb.LayoutView do
  use ApiWeb, :view

  def meta_tags(attrs_list) do
    Enum.map(attrs_list, &meta_tag/1)
  end

  def meta_tag(attrs) do
    tag(:meta, Enum.into(attrs, []))
  end

  alias Api.Notifications

  def has_unread_notification?(user) do
    Notifications.unread_notification_count(user) > 0
  end

  def unread_notification_count(user) do
    Notifications.unread_notification_count(user)
  end
end
