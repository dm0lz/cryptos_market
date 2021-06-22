class Api::V1::Public::MarketInfosController < Api::V1::BaseController

  def index
    @market_infos = MarketInfo.first
    render 'api/v1/public/market_infos/index.json'
  end

end
