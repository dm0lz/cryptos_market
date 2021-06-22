class Alarm < ApplicationRecord
  belongs_to :user
  belongs_to :asset_info

  validates :asset_info, uniqueness: { scope: :user_id }
  validate :min_limit_consistency, :max_limit_consistency, :max_number_of_alarms
  validates :asset_symbol, presence: true

  def min_limit_consistency
    # binding.pry
    if has_min_limit && (min_limit >= asset_info.price_usd)
      errors.add(:min_limit, "Must be less than current asset usd price")
    end
    if has_min_limit && (min_limit <= 0)
      errors.add(:min_limit, "Must be greater than 0")
    end
  end

  def max_limit_consistency
    if has_max_limit && (max_limit <= asset_info.price_usd)
      errors.add(:max_limit, "Must be greater than current asset usd price")
    end
  end

  def max_number_of_alarms
    if user.alarms.count > 10
      errors.add(:alarms_count, "can't be superior to 10")
    end
  end

  scope :active, -> { where(is_active: true) }

end
