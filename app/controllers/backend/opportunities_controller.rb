class Backend::OpportunitiesController < Backend::BaseController


  def index
    @markets = Market.of_interest.where(has_opportunity: true).where(spread: 4..99).order(spread: :desc)
      # Market
      #   .left_joins(:pairs)
      #   .group(:id)
      #   .order('COUNT(pairs.id) DESC')
      #   .limit(50)
  end

  def show
    @market = Market.find(params[:id])
  end

  def unwatch
    market = Market.find(params[:id])
    market.update_column(:is_watched, false)
    redirect_to backend_markets_path
  end


end
