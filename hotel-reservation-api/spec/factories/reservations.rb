FactoryBot.define do
  factory :reservation do
    sequence(:reservation_id) { |n| "reservation#{n}" }
    hotel_name { "MyString" }
    price { 1.5 }
    currency { "MyString" }
    start_date { "2023-08-21" }
    end_date { "2023-08-22" }
    guest_name { "MyString" }
    guest_email { "MyString" }
  end
end
