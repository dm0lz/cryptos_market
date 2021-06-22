class AlarmMailer < ApplicationMailer
  default from: '***@gmail.com'

  def email_alert(alarm_id)
    @alarm = Alarm.find alarm_id
    @user = @alarm.user
    mail(to: @user.email, subject: "#{@alarm.asset_symbol} Alarm Triggered Email Alert")
  end
end
