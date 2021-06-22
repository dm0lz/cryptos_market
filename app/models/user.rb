class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable, :trackable, :validatable, :recoverable
         #:recoverable, :rememberable, :trackable, :validatable

  has_one :portfolio
  has_many :alarms

  after_create do
    Portfolio.create(user: self)
  end
end
