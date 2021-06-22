# config valid only for current version of Capistrano
lock '3.11.0'

set :application, 'cryptos_market'
set :repo_url, 'git@bitbucket.org:dm0lz/cryptos_market.git'

# Default branch is :master
# ask :branch, `git rev-parse --abbrev-ref HEAD`.chomp

# Default deploy_to directory is /var/www/my_app_name
set :deploy_to, "/home/deployer/apps/#{fetch(:application)}"

# Default value for :format is :airbrussh.
# set :format, :airbrussh

# capistrano-rvm config :
set :rvm_type, :system
#set :rvm_type, :user
#set :rvm_ruby_version, 'ruby-2.4.5@cryptos_market'
# set :rvm_ruby_version, 'ruby-2.4.1@cryptos_market'
# You can configure the Airbrussh format using :format_options.
# These are the defaults.
# set :format_options, command_output: true, log_file: "log/capistrano.log", color: :auto, truncate: :auto

# Default value for :pty is false
set :pty, true

# Default value for :linked_files is []
append :linked_files, 'config/database.yml', 'config/secrets.yml'

# Default value for linked_dirs is []
append :linked_dirs, 'log', 'tmp/pids', 'tmp/cache', 'tmp/sockets', 'public/system', 'node_modules'

# Default value for default_env is {}
# set :default_env, { path: "/opt/ruby/bin:$PATH" }

# Default value for local_user is ENV['USER']
# set :local_user, -> { `git config user.name`.chomp }

# Default value for keep_releases is 5
# set :keep_releases, 5

desc 'Invoke a rake command on the remote server'
task :invoke, [:command] => 'deploy:set_rails_env' do |_task, args|
  on primary(:app) do
    within current_path do
      with rails_env: fetch(:rails_env) do
        rake args[:command]
      end
    end
  end
end

# Correct deployment sequence :
# cap production sidekiq:quiet
# cap production sidekiq:stop
# cap production invoke[sidekiq_cleaner:run] # should not reset mailer queue...
# cap production deploy
# cap production sidekiq:start

# => cap production invoke[sidekiq_cleaner:run]

# after 'deploy:starting', 'sidekiq:quiet'
# after 'deploy:updated', 'sidekiq:stop'
# after 'deploy:reverted', 'sidekiq:stop'
# after 'deploy:published', 'sidekiq:start'
