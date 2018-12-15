# == Schema Information
#
# Table name: hours
#
#  id          :bigint(8)        not null, primary key
#  business_id :integer
#  day         :string
#  open        :string
#  close       :string
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Hour < ApplicationRecord
  validates :business_id, :day, :open, :close, presence: true
  belongs_to :business
end
