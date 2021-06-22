namespace :sidekiq_cleaner do

  desc "Clean Sidekiq"
  task run: :environment do
    Cleaner.reset_sidekiq
  end

end
