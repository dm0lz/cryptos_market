class InterestingMarketsFinder

  def call
    # markets = Market.left_joins(:pairs).group(:id).order('COUNT(pairs.id) DESC').limit(300)
    #markets = Market.where(base_currency: "ETH")
    #                .or(Market.where(quote_currency: "ETH"))
    #                .left_joins(:pairs)
    #                .group(:id)
    #                .order('COUNT(pairs.id) DESC')
    #                .limit(300)

    # markets = Market.left_joins(:pairs)
    #                 .group(:id)
    #                 .order('COUNT(pairs.id) DESC')
    #                 .limit(300)
    # markets.each do |market|
    #   return if market.pairs.count < 2
    #   market.is_watched = true
    #   market.save!
    #   market.pairs.each do |pair|
    #     pair.is_watched = true
    #     pair.save!
    #   end
    # end

    Pair.all.each do |pair|
      if pair.last_ticker_id
        market = Market.find_by(base_currency: pair.base_currency, quote_currency: pair.quote_currency)
        pair.update_column(:is_watched, true)
        if market.pairs.watched.count > 1
          market.update_column(:is_watched, true)
        end
      end
    end


  end


end
