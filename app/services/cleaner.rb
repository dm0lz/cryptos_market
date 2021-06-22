class Cleaner
  class << self

    def kraken
      Exchange.find_by(name: 'kraken').pairs.each{|l| l.destroy if l.name.include?('.d')}
    end

    def reset_sidekiq
      ss = Sidekiq::ScheduledSet.new
      ss.clear
      rs = Sidekiq::RetrySet.new
      rs.clear
      Sidekiq::Queue.all.map do |queue|
        queue.each do |job|
          job.delete
        end
      end
    end

    def reports
      Report.destroy_all
      Market.of_interest.each do |market|
        market.update_column(:price_difference, nil)
      end
    end

    def interesting_markets_reinitializer
      Market.of_interest.each do |market|
        market.update_column(:is_watched, false)
        market.pairs.each do |pair|
          pair.update_column(:is_watched, false)
        end
      end
    end

  end
end
