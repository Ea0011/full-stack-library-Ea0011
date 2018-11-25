FactoryBot.define do
    factory :book do
        name { Faker::Lorem.word }
        pages { Faker::Number.number(3) }
        genre { Faker::Lorem.word }
        description { Faker::Lorem.paragraph(2) }
        rating { Faker::Number.number(2) }
        written_by { Faker::Lorem.word }
    end
end