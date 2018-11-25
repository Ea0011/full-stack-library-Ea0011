require 'rails_helper'

RSpec.describe Author, type: :model do
    it { should have_many(:books) }

    it { should validate_presence_of(:email) }
    it { should validate_presence_of(:fname) }
    it { should validate_presence_of(:lname) }
    # field password_digest is used by bcrypt to do JWT Authentication
    it { should validate_presence_of(:password_digest) }
end