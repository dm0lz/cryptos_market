# Warden::Manager.after_set_user do |user,auth,opts|
#   scope = opts[:scope]
#   auth.cookies.signed["#{scope}.id"] = user.id
#   auth.cookies.signed["#{scope}.expires_at"] = 30.minutes.from_now
# end
# Warden::Manager.before_logout do |user, auth, opts|
#   scope = opts[:scope]
#   auth.cookies.signed["#{scope}.id"] = nil
#   auth.cookies.signed["#{scope}.expires_at"] = nil
# end
# https://stackoverflow.com/questions/40806875/actioncable-failed-to-upgrade-to-websocket-in-production/43219724
