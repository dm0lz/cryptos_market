class Api::V1::Private::BaseController < ActionController::Base
  protect_from_forgery with: :null_session
  include ErrorsConcern
  include JwtAuthConcern
  layout 'api.v1.json.jbuilder'
end
