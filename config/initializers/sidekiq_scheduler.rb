require 'sidekiq'
require 'sidekiq-scheduler'

Sidekiq.configure_server do |config|

  if Rails.env == 'production'
    config.on(:startup) do
      Sidekiq.schedule = YAML.load_file(File.expand_path('./../../sidekiq_scheduler_production.yml', __FILE__))
      Sidekiq::Scheduler.reload_schedule!
    end
  else
    config.on(:startup) do
      Sidekiq.schedule = YAML.load_file(File.expand_path('./../../sidekiq_scheduler_development.yml', __FILE__))
      Sidekiq::Scheduler.reload_schedule!
    end
  end

end
