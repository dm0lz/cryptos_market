class OpportunitiesChannel < ApplicationCable::Channel
  # Called when the consumer has successfully
  # become a subscriber of this channel.
  def subscribed
    stream_from "opportunities:arbitrage:1"
  end

  def unsubscribed
    puts "unsubscribed"
  end

end
