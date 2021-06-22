class RestExchange::Pairs::Persister

  def initialize exchange, pairs_array
    @exchange = exchange
    @pairs_array = pairs_array
  end

  def call
    @pairs_array.each do |pair_payload|
      existing_pair = @exchange.pairs.find_by(name: pair_payload[mapping['name']])
      unless existing_pair
        base_currency = pair_payload[mapping[:base_currency]].upcase
        quote_currency = pair_payload[mapping[:quote_currency]].upcase

        existing_market = Market.find_by(base_currency: base_currency, quote_currency: quote_currency)
        # Create market if does not yet exists
        unless existing_market
          existing_market = Market.create!(
            name: "#{base_currency}-#{quote_currency}",
            base_currency: base_currency,
            quote_currency: quote_currency
          )
        end
        pair = Pair.new(
          name: pair_payload[mapping[:name]],
          base_currency: base_currency,
          quote_currency: quote_currency,
          min_trade_size: pair_payload[mapping[:min_trade_size]],
          is_active: pair_payload[mapping[:is_active]],
          is_frozen: pair_payload[mapping[:is_frozen]],
          original_payload: pair_payload[:original_payload],
          exchange_id: @exchange.id,
          market_id: existing_market.id
        )
        pair.save!
      end
    end
    return @exchange.pairs.count
  end

  private
  def mapping
    @exchange.pair_data_map.with_indifferent_access
  end

end
