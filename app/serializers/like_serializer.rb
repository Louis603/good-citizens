class LikeSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :marker_id
end
