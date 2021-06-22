class Backend::BaseController < ApplicationController
  before_action :authenticate_backend_admin!
  layout 'backend.html.erb'
end
