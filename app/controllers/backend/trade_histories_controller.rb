class Backend::TradeHistoriesController < Backend::BaseController


  def index
    @pair = Pair.find(params[:pair_id])
    @trade_histories = @pair.trade_histories
  end

  def show
    @trade_history = TradeHistory.find(params[:id])
  end


end
