json.sessions do
  json.id @user.id
  json.email @user.email
  json.jwt @jwt
end
