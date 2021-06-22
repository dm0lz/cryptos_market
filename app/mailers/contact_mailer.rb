class ContactMailer < ApplicationMailer
  default from: '***@gmail.com'

  def contact_us(email, message)
    @message = message
    @email = email
    mail(to: '***@outlook.com', subject: "Simplemarketcap contact form")
  end
end
