class AssetsInfoFetcherJob < ApplicationJob
  queue_as :assets_info_fetcher_job

  def perform
    RestExchange::AssetsInfo::Fetcher.new.call
  end

end
