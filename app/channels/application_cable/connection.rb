module ApplicationCable
  class Connection < ActionCable::Connection::Base

     identified_by :current_user
     def connect
       true#self.current_user = find_verified_user
     end
     private
     def find_verified_user
       #binding.pry
       if subscribing_user
         subscribing_user
       else
         reject_unauthorized_connection
       end

     end

     def subscribing_user
       User.find(decoded_token["user_id"])
     end

     def token
       request.params["jwt"] || nil
     end

     def decoded_token
       reject_unauthorized_connection && return unless token
       JsonWebToken.decode(token)
     end


     # identified_by :current_admin
     # def connect
     #   self.current_admin = find_verified_user
     # end
     # private
     # def find_verified_user
     #   #binding.pry
     #   if current_admin = env['warden'].user
     #     current_admin
     #   else
     #     reject_unauthorized_connection
     #   end
     # end

    # identified_by :current_admin
    # def connect
    #   self.current_admin = find_verified_admin
    #   logger.add_tags 'ActionCable', current_admin.name
    # end
    # protected
    # def find_verified_admin
    #   verified_admin = Admin.find_by(id: cookies.signed['user.id'])
    #   if verified_admin && cookies.signed['user.expires_at'] > Time.now
    #     verified_admin
    #   else
    #     reject_unauthorized_connection
    #   end
    # end

  end
end
