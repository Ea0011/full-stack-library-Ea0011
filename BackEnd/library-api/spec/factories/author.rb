FactoryBot.define do
    factory :author do
        fname { Faker::Lorem.word }
        lname { Faker::Lorem.word }
        email { "avagyanee@gmail.com" }
        password { "fake_password" }
    end
end