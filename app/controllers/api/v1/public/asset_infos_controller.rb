class Api::V1::Public::AssetInfosController < Api::V1::BaseController

  def index
    if params[:asset_search].present?
      @assets_infos = AssetInfo.where("name ~* ?", params[:asset_search])
                  .or(AssetInfo.where("symbol ~* ?", params[:asset_search]))
    elsif params[:order_by].present? && params[:sort].present?
      @assets_infos = AssetInfo.where("#{params[:order_by]} IS NOT NULL").order("#{params[:order_by]} #{params[:sort]}").page(params[:page]).per(15)
    else
      @assets_infos = AssetInfo.all.order(:rank).page(params[:page]).per(15)
    end
    @watched_assets_count = AssetInfo.count
    render 'api/v1/public/asset_infos/index.json'
  end

  def all
    @assets_infos = AssetInfo.all.order(:rank)
    render 'api/v1/public/asset_infos/index.json'
  end

  def show
    #@market = Market.find_by(name: params[:id])
    #render 'api/v1/public/markets/show.json'
    @asset_info = AssetInfo.find_by(symbol: params[:id].upcase)
    render 'api/v1/public/asset_infos/show.json'
  end

end
