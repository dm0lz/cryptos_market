namespace :sidekiq do

  # Sidekiq is setup as a Gem
  # A systemd service is used to make sure it respawns in case of crash (/etc/systemd/system/sidekiq.service).

  desc "quiet sidekiq"
  task :quiet do
    on roles(:all) do
      if fetch(:stage) == :production
        # /home/deployer/.rvm/gems/ruby-2.2.3/wrappers/bundle exec sidekiqctl quiet /home/deployer/apps/gocode/current/tmp/pids/sidekiq.pid
        execute :sudo, "systemctl reload sidekiq"
      end
    end
  end

  desc "stop sidekiq"
  task :stop do
    on roles(:all) do
      if fetch(:stage) == :production
        # /home/deployer/.rvm/gems/ruby-2.2.3/wrappers/bundle exec sidekiqctl stop /home/deployer/apps/gocode/current/tmp/pids/sidekiq.pid
        execute :sudo, "systemctl stop sidekiq"

        #execute "cd /home/deployer/apps/cryptos_market/current && /home/deployer/.rvm/gems/ruby-2.4.1@cryptos_market/wrappers/bundle exec rake sidekiq_cleaner:run production"
        #execute :rake, "sidekiq_cleaner:run"
        #Cleaner.reset_sidekiq
        #execute :rake, 'invoke[sidekiq_cleaner:run]'
      end
    end
  end

  desc "start sidekiq"
  task :start do
    on roles(:all) do
      if fetch(:stage) == :production
        # /home/deployer/.rvm/gems/ruby-2.2.3/wrappers/bundle exec sidekiq -e production -t 30 -q mailers -P /home/deployer/apps/gocode/current/tmp/pids/sidekiq.pid -L /home/deployer/apps/gocode/current/log/sidekiq.log
        execute :sudo, "systemctl start sidekiq"
      end
    end
  end


end
