class Like < ApplicationRecord
    belongs_to :user
    belongs_to :marker

    validates :user, presence: true
    validates :marker, presence: true
end
