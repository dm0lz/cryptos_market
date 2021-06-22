class TickersChannel < ApplicationCable::Channel
  # Called when the consumer has successfully
  # become a subscriber of this channel.
  def subscribed
    stream_from "tickers:all"
  end

  def unsubscribed
    puts "unsubscribed"
  end

end
