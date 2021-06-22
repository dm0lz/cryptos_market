class MarketChannel < ApplicationCable::Channel
  # Called when the consumer has successfully
  # become a subscriber of this channel.
  def subscribed
    market = Market.find(params[:id])
    stream_for market
  end

  def unsubscribed
    puts "unsubscribed"
  end

end
