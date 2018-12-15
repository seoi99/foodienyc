# == Schema Information
#
# Table name: images
#
#  id          :bigint(8)        not null, primary key
#  business_id :integer
#  img_url     :string
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Image < ApplicationRecord
  validates :business_id, :img_url, presence: true
  belongs_to :business

end
