class User < ApplicationRecord
    has_many :comments
    has_many :markers
    has_many :markers, through: :comments
end