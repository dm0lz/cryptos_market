class Backend::ExchangePairsController < Backend::BaseController
  def index
    @exchange = Exchange.find(params[:exchange_id])
    @pairs = @exchange.pairs
  end

  def show
    @pair = Exchange.find(params[:id])
  end

  # def unwatch
  #  pair = Exchange.find(params[:id])
  #  pair.update_column(:is_watched, false)
  #  redirect_to backend_market_reports_path(params[:market_id])
  # end
end
