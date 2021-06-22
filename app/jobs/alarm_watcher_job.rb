class AlarmWatcherJob < ApplicationJob
  queue_as :alarm_watcher_job

  def perform
    AlarmsChecker.new.call
  end

end
