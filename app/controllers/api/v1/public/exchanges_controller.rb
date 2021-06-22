class Api::V1::Public::ExchangesController < Api::V1::BaseController

  def index
    @exchanges = Exchange.all
    render 'api/v1/public/exchanges/index.json'
  end

end
