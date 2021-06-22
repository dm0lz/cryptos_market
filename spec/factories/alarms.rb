FactoryGirl.define do
  factory :alarm do
    user nil
    asset_info nil
    min_limit "9.99"
    max_limit "9.99"
  end
end
