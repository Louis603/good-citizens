class Marker < ApplicationRecord

    has_many :likes
    has_many :comments, dependent: :destroy
    has_one :user
    has_many :users, through: :comments
end
