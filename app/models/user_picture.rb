# == Schema Information
#
# Table name: user_pictures
#
#  id         :bigint(8)        not null, primary key
#  user_id    :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class UserPicture < ApplicationRecord
  validates :user_id, presence: true
  belongs_to :user
  has_one_attached :photo

end
