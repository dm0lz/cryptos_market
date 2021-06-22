class Api::V1::Public::MarketsController < Api::V1::BaseController

  def index
    if params[:market_search].present?
      @markets = Market.where("base_currency ~* ?", params[:market_search])
                  .or(Market.where("quote_currency ~* ?", params[:market_search]))
                  .or(Market.where("name ~* ?", params[:market_search]))
      @watched_markets_count = @markets.count
      @markets = @markets.page(params[:page]).per(15)
    else
      # binding.pry
      @markets = Market#.of_interest.find([306, 305, 329, 383, 378, 262]) #Market.of_interest.first(8)
                    .of_interest.with_active_pairs.sort_by{|hsh| hsh.spread.to_f}.reverse
                    #.page(params[:page]).per(15)
                    #.of_interest.where.not(spread: nil).order(spread: :desc)
                    #.of_interest
                    #.left_joins(:pairs).group(:id).having("COUNT(pairs.id) > 1")
                    #.
                    # .left_joins(:pairs)
                    # .group(:id)
                    # .order('COUNT(pairs.id) DESC')
      #@watched_markets_count = @markets.count
      @watched_markets_count = Market.left_joins(:pairs).group(:id).length
      @markets = Kaminari.paginate_array(@markets).page(params[:page]).per(15)
      #@watched_markets_count = Market.of_interest.count
    end
    #@total_markets_count = Market.count
    render 'api/v1/public/markets/index.json'
  end

  def show
    @market = Market.find_by(name: params[:id])
    render 'api/v1/public/markets/show.json'
  end

end

#Market.left_joins(:pairs).group(:id).having("COUNT(pairs.id) > 1")
