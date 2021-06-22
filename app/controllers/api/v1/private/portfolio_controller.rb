class Api::V1::Private::PortfolioController < Api::V1::Private::BaseController
  def index
    #binding.pry
    ordered_by_total = current_user.portfolio.portfolio_assets.map{|l| {symbol: l.symbol, portfolio_asset_id: l.id, total: l.asset_info.price_usd * l.amount}}.sort_by { |hsh| hsh[:total] }
    @portfolio_assets = current_user.portfolio.portfolio_assets
    arr = []
    ordered_by_total.each do |asset|
      arr << @portfolio_assets.find_by(symbol: asset[:symbol])
    end
    @portfolio_assets = arr.reverse
    render 'api/v1/private/portfolio/index.json'
  end

  def add_asset
    render_error(code: 422, message: "No Asset Info", error_fields: {}) && return unless params["asset_info"]
    @portfolio_asset = PortfolioAsset.new(
      portfolio_id: current_user.portfolio.id,
      asset_info_id: asset_infos_params[:value],
      symbol: asset_infos_params[:symbol],
      amount: params.permit(:amount)[:amount].to_f
    )
    if(@portfolio_asset.save)
      render 'api/v1/private/portfolio/add_asset.json'
    else
      render_error(code: 422, message: @portfolio_asset.errors.full_messages, error_fields: {errors: @portfolio_asset.errors}) && return
    end
  end

  def remove_asset
    if current_user.portfolio.portfolio_assets.find_by(symbol: params["symbol"]).destroy!
      render json: {message: 'success'}, status: 204
    end
  end

  def edit_asset
    #binding.pry
    @portfolio_asset = current_user.portfolio.portfolio_assets.find_by(symbol: params["symbol"]["symbol"])
    @portfolio_asset.amount = params["symbol"]["amount"].to_f
    if @portfolio_asset.save
      render 'api/v1/private/portfolio/add_asset.json'
    else
      render_error(code: 422, message: @portfolio_asset.errors.full_messages, error_fields: {errors: @portfolio_asset.errors}) && return
    end
  end

  private
  def asset_infos_params
    params.require(:asset_info).permit!
  end
end
