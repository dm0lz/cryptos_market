class AlarmMailerJob < ApplicationJob
  queue_as :alarm_mailer_job

  def perform alert_id
    AlarmMailer.email_alert(alert_id).deliver_now
  end

end
