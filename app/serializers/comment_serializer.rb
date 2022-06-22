class CommentSerializer < ActiveModel::Serializer
  attributes :id, :comment, :user_id, :marker_id, :name

  def name
    object.user.username
  end

end
