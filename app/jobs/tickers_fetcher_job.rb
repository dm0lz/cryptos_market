
class TickersFetcherJob

  include Sidekiq::Worker
  sidekiq_options :queue => :tickers_fetcher_job, :retry => false, :backtrace => true

  def perform exchange_name

      exchange = Exchange.find_by(name: exchange_name)
      #logger.info "#{exchange.name} is already being fetched for tickers" and return if exchange.is_fetching_tickers

      begin
        #exchange.update_column(:is_fetching_tickers, true)
        exchange.get_tickers
      rescue => error
        logger.info error
        raise error
      ensure
        #exchange.update_column(:is_fetching_tickers, false)
      end

  end

end
