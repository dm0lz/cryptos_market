class Backend::PairsController < Backend::BaseController


  def index
    @market = Market.find(params[:market_id])
    @pairs = @market.pairs
  end

  def show
    @pair = Pair.find(params[:id])
  end

  def unwatch
    pair = Pair.find(params[:id])
    pair.update_column(:is_watched, false)
    pair.market.update_column(:spread, nil)
    redirect_to backend_market_reports_path(params[:market_id])
  end

  def watch
    pair = Pair.find(params[:id])
    pair.update_column(:is_watched, true)
    pair.market.update_column(:spread, nil)
    redirect_to backend_market_reports_path(params[:market_id])
  end

  def update
    @pair = Pair.find(params[:id])
    if @pair.update_attributes(pair_params)
      @pair.market.update_column(:spread, nil)
      redirect_to backend_market_pairs_path(@pair.market)
    else
      @errors = @pair.errors.full_messages
      render :edit
    end
  end

  def edit
    @pair = Pair.find(params[:id])
  end

  private
  def pair_params
    params.require(:pair).permit(:id, :market_id)
  end

end
