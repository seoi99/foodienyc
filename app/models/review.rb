# == Schema Information
#
# Table name: reviews
#
#  id          :bigint(8)        not null, primary key
#  user_id     :integer
#  business_id :integer
#  body        :string
#  rating      :integer
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Review < ApplicationRecord
  validates :body, :rating, presence: true
  belongs_to :user
  belongs_to :business

end
