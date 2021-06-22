class Backend::ExchangesController < Backend::BaseController

  before_action :find_exchange, only: [:edit, :show, :update]

  def index
    @exchanges = Exchange.all
  end

  def new
    @exchange = Exchange.new
  end

  def create
    @exchange = Exchange.new(exchange_params)
    if @exchange.save
      redirect_to backend_exchanges_path
    else
      @errors = @exchange.errors.full_messages
      render :new
    end
  end

  def update
    if @exchange.update_attributes(exchange_params)
      redirect_to backend_exchanges_path
    else
      @errors = @exchange.errors.full_messages
      render :edit
    end
  end

  def edit
  end

  def show
  end

  private
  def exchange_params
    params.require(:exchange).permit(:id, :get_user_pair_path, :country)
  end

  def find_exchange
    @exchange = Exchange.find(params[:id])
  end
end
