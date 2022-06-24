class Comment < ApplicationRecord
    belongs_to :user
    belongs_to :marker

    validates :user_id, presence: true
    validates :marker_id, presence: true
    validates :comment, presence: true

end
