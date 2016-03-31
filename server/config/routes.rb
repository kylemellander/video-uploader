Rails.application.routes.draw do
  resources :videos, only: 'create'
end
