class Api::V1::RegistrationsController < ActionController::Base

  protect_from_forgery with: :null_session
  include ErrorsConcern
  layout 'api.v1.json.jbuilder'

  def create
    @user = User.new(user_params)
    render_error(code: 422, message: @user.errors.full_messages, error_fields: {}) && return unless @user.save
    @jwt = JsonWebToken.encode(user_id: @user.id)
    render 'api/v1/sessions/create.json'
  end

  private
  def user_params
    params.permit(:email, :password, :password_confirmation)
  end

end
