class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :password_digest, :admin

  has_many :likes, serializer: LikeMarkerSerializer
end
