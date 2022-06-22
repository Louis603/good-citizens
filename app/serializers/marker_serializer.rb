class MarkerSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :image, :longitude, :latitude, :user_id

  has_many :comments
end
