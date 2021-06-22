class Api::V1::SessionsController < ActionController::Base

  protect_from_forgery with: :null_session
  include ErrorsConcern
  layout 'api.v1.json.jbuilder'

  def create
    #binding.pry
    @user = User.find_by(email: user_params["email"])
    if @user && @user.valid_password?(user_params["password"])
      #render_error(code: 401, message: "You must confirm your account", error_fields: {}) && return unless @user.confirmed?
      @jwt = JsonWebToken.encode(user_id: @user.id)
      render 'api/v1/sessions/create.json'
    else
      render_error(code: 401, message: "Invalid Credentials", error_fields: {}) && return
    end
  end

  private
  def user_params
    params.require(:session).permit(:email, :password)
  end

end
