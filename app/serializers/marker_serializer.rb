class MarkerSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :image, :coordinates, :user_id
end
