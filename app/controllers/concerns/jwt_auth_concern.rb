module JwtAuthConcern
  extend ActiveSupport::Concern

  included do
    before_action :authenticate_token!

    def c_user
      return nil unless token && decoded_token

      User.find(decoded_token['user_id'])
    end
    alias_method :current_user, :c_user

    protected

    def authenticate_token!
      if c_user
        # binding.pry
        # render_error(code: 401, message: 'You must confirm your account', error_fields: {}) && return unless current_user.confirmed?
        current_user || sign_in(c_user, store: false)
      else
        sign_out(c_user)
        render_error(code: 401, message: 'Invalid JWT Token', error_fields: {}) && return
      end
    end

    private

    def token
      request.headers.fetch('Authorization') || nil
      # request.env.fetch("HTTP_AUTH_TOKEN") || nil
    end

    def decoded_token
      render_error(code: 401, message: 'Invalid JWT Token', error_fields: {}) && return unless token
      JsonWebToken.decode(token)
    end
  end
end
