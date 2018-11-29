Rails.application.routes.draw do
  resources :books
  post 'auth/login', to: 'authentication#login'
  post 'signup', to: 'authors#create'
  get 'authors', to: 'authors#index'
  get 'authors/:id', to: 'authors#show'
  post 'auth/logout', to: 'authentication#logout'
  put 'authors/', to: 'authors#update'
  delete 'authors/', to: 'authors#destroy'
  get 'mybooks', to: 'authors#current_books'
  get 'books/search/:text', to: 'books#search'
end
