class ContactMailerJob < ApplicationJob
  queue_as :contact_mailer_job

  def perform(email, message)
    ContactMailer.contact_us(email, message).deliver_now
  end
end
