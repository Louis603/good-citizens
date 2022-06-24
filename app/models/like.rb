class Like < ApplicationRecord
    belongs_to :user
    belongs_to :marker

    validates :user, presence: true
    validates :marker, presence: true
    validates :user_id, uniqueness: {scope: :marker_id}
end
