class AlarmsChecker

  def call
    User.all.each do |user|
      user.alarms.active.each do |alarm|
        if alarm.has_min_limit
          if alarm.min_limit >= alarm.asset_info.price_usd
            trigger_email_alert(alarm)
            alarm.update_column(:is_active, false)
          end
        end
        if alarm.has_max_limit
          if alarm.max_limit <= alarm.asset_info.price_usd
            trigger_email_alert(alarm)
            alarm.update_column(:is_active, false)
          end
        end
      end
    end
  end

  private
  def trigger_email_alert alarm
    alarm_id = alarm.id
    AlarmMailerJob.perform_later(alarm_id)
  end

end
