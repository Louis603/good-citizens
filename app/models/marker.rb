class Marker < ApplicationRecord

    has_many :likes, dependent: :destroy
    has_many :comments, dependent: :destroy
    has_one :user
    has_many :users, through: :comments
end
