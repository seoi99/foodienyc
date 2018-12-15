# == Schema Information
#
# Table name: users
#
#  id              :bigint(8)        not null, primary key
#  username        :string
#  password_digest :string
#  session_token   :string
#  firstname       :string
#  lastname        :string
#  zipcode         :integer
#  date            :integer
#  month           :string
#  year            :integer
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

class User < ApplicationRecord
  validates :username, :password_digest, :session_token, :firstname, :lastname, :zipcode, presence: true
  validates :username, :session_token, uniqueness: true
  validates :password, length: {minimum: 6}, allow_nil: true
  validates :zipcode, length: {minimum: 5, maximum: 5, allow_nil: true}

  has_many :reviews
  has_one :user_picture


  after_initialize :ensure_session_token
  attr_reader :password


  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end


  def password= (password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def self.find_by_credentials(username, password)
    user = User.find_by(username: username)
    return nil unless user && user.is_password?(password)
    user
  end

  def reset_session_token!
    self.session_token = SecureRandom.urlsafe_base64(16)
    self.save!
    self.session_token
  end

  private
  def ensure_session_token
    self.session_token ||= SecureRandom.urlsafe_base64(16)
  end

end
