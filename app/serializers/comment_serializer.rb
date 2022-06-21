class CommentSerializer < ActiveModel::Serializer
  attributes :id, :comment, :user_id, :marker_id
end
