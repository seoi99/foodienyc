Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
root to: 'static_pages#root'
namespace :api, defaults: {format: 'json'} do
  get 'businesses/search', to: 'businesses#search'
  resources :users, only: [:create]
  resources :user_pictures, only: [:create, :show, :index, :destroy]
  resources :businesses, only: [:index, :show]
  resources :reviews
  resource :session, only: [:create, :destroy, :show]
end
end
