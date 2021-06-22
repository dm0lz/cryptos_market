class MarketsLogoRetriever

  def initialize
  end

  def call

    request = HttpRequest.new('https://www.cryptocompare.com')
    response = request.get('/api/data/coinlist/')
    res = JSON.parse(response)["Data"]

    res.each do |infos|
      markets = Market.of_interest.where(base_currency: infos.first)
      markets.all.each do |market|
        path = infos.last["ImageUrl"]
        return unless path
        market.base_currency_logo = 'https://www.cryptocompare.com' + path
        market.save!
      end
    end

    res.each do |infos|
      markets = Market.of_interest.where(quote_currency: infos.first)
      markets.all.each do |market|
        path = infos.last["ImageUrl"]
        return unless path
        market.quote_currency_logo = 'https://www.cryptocompare.com' + path
        market.save!
      end
    end

    Market.of_interest.each do |market|
      if market.base_currency == 'USD'
        market.base_currency_logo = 'https://image.freepik.com/free-icon/dollar-symbol_318-43923.jpg'
        market.save!
      elsif market.quote_currency == 'USD'
        market.quote_currency_logo = 'https://image.freepik.com/free-icon/dollar-symbol_318-43923.jpg'
        market.save!
      elsif market.base_currency == 'EUR'
        market.base_currency_logo = 'https://image.freepik.com/icones-gratuites/symbole-euro_318-33107.jpg'
        market.save!
      elsif market.quote_currency == 'EUR'
        market.quote_currency_logo = 'https://image.freepik.com/icones-gratuites/symbole-euro_318-33107.jpg'
        market.save!
      end
    end

    # Market.of_interest.each do |market|
    #   if market.base_currency == 'ETH'
    #     market.base_currency_logo = 'https://www.cryptocompare.com/media/20646/eth_logo.png'
    #     market.save!
    #   elsif market.quote_currency == 'ETH'
    #     market.quote_currency_logo = 'https://www.cryptocompare.com/media/20646/eth_logo.png'
    #     market.save!
    #   elsif market.base_currency == 'LTC'
    #     market.base_currency_logo = 'https://www.cryptocompare.com/media/19782/litecoin-logo.png'
    #     market.save!
    #   elsif market.quote_currency == 'LTC'
    #     market.quote_currency_logo = 'https://www.cryptocompare.com/media/19782/litecoin-logo.png'
    #     market.save!
    #   end
    # end

  end

end
