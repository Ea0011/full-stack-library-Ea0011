Rails.application.routes.draw do
  resources :books
  post 'auth/login', to: 'authentication#login'
  post 'signup', to: 'authors#create'
  get 'authors', to: 'authors#index'
end
