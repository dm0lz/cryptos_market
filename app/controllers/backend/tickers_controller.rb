class Backend::TickersController < Backend::BaseController


  def index
    @pair = Pair.find(params[:pair_id])
    @tickers = @pair.tickers.order(id: :desc).limit(100)
  end

  def show
    @ticker = Ticker.find(params[:id])
  end


end
