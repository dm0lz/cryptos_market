class TickersLauncherJob < ApplicationJob
  queue_as :tickers_launcher_job

  def perform
    Exchange.with_tickers_endpoint.each_with_index do |exchange, index|
      exchange_name = exchange.name
      wait_time = index * 20
      TickersFetcherJob.perform_in(wait_time.seconds, exchange_name)
    end
  end
end
