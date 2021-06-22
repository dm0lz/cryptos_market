class Backend::OrderBooksController < Backend::BaseController


  def index
    @pair = Pair.find(params[:pair_id])
    @order_books = @pair.order_books
  end

  def show
    @order_book = OrderBook.find(params[:id])
  end


end
