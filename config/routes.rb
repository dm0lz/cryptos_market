class AdminConstraint
  def matches?(request)
    return false unless request.session["warden.user.backend_admin.key"]
    return true
  end
end

Rails.application.routes.draw do

  require 'sidekiq/web'
  require 'sidekiq-scheduler/web'
  mount Sidekiq::Web => '/backend/sidekiq', :constraints => AdminConstraint.new

  mount ActionCable.server, at: '/cable'

  devise_for :users, only: :passwords, controllers: { :passwords => "frontend/users/passwords" }

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :backend do
    root to: "home#index"
    resources :exchanges do
      resources :exchange_pairs, only: [:index, :show]
    end
    devise_for :admins, :controllers => { :sessions => "backend/admins/sessions", registrations: "backend/admins/registrations" }

    resources :opportunities, only: [:index, :show]
    resources :markets, only: [:index, :show] do
      collection do
        get :all
      end
      member do
        patch :unwatch
        patch :watch
      end
      resources :reports, only: [:index, :show]
      resources :pairs, only: [:index, :show, :edit, :update] do
        member do
          patch :unwatch
          patch :watch
        end
        resources :tickers, only: [:index, :show]
        resources :order_books, only: [:index, :show]
        resources :trade_histories, only: [:index, :show]
      end
    end
  end

  namespace :api, format: 'json' do
    namespace :v1 do
      devise_for :users, controllers: { :sessions => "backend/users/sessions", registrations: "backend/users/registrations", confirmations: 'backend/users/confirmations' }
      namespace :public do
        resources :markets, only: [:index, :show]
        resources :market_infos, only: [:index]
        resources :contact_us, only: [:create]
        resources :asset_infos, only: [:index, :show] do
          collection do
            get :all
          end
        end
        resources :exchanges, only: [:index]
      end
      namespace :private do
        resources :alarms, only: [:index, :create] do
          collection do
            patch :toggle_activation
            patch :destroy_alarm
            patch :edit_alarm
          end
        end
        resources :portfolio, only: [:index] do
          collection do
            post :add_asset
            patch :remove_asset
            patch :edit_asset
          end
        end
      end
      resources :sessions, only: [:create]
      resources :registrations, only: [:create]
    end
  end

  namespace :frontend do
    root to: "home#index"
  end

  root to: "frontend/home#index"
  get "*path", to: "frontend/home#index"

end
