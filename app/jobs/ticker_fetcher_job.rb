class TickerFetcherJob < ApplicationJob
  queue_as :ticker_fetcher_job

  # We need to make sure not to get banned !!

  def perform pair_id
    pair = Pair.find(pair_id)
    if pair.market.is_watched && pair.is_watched
      if pair.exchange.last_ticker_request && (pair.exchange.last_ticker_request > (DateTime.current - 10.seconds)) # last_ticker_request Happened less than 15 seconds ago
        # Too early to perform request yet
        next_request = DateTime.current + 5.seconds  # Trying to fullfill its destiny every 15 seconds
      else
        pair.get_ticker
        random_sec = Random.rand(1..30)
        next_request = DateTime.current + (random_sec + 80).seconds # Request to exchange for pair_id every
      end
      TickerFetcherJob.set(wait_until: next_request).perform_later(pair_id)
    end
  end

end
