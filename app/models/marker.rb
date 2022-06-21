class Marker < ApplicationRecord
    has_many :comments
    has_one :user
    has_many :users, through: :comments
end
