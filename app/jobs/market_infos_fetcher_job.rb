class MarketInfosFetcherJob < ApplicationJob
  queue_as :market_infos_fetcher_job

  def perform
    RestExchange::MarketInfos::Fetcher.new.call
  end

end
