class User < ApplicationRecord
    has_secure_password

    has_many :likes
    has_many :comments
    has_many :markers
    has_many :markers, through: :comments

    validates :username, uniqueness: true
    validates :username, presence: true
    validates :password, presence: true
end
