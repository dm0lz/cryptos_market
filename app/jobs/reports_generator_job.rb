class ReportsGeneratorJob < ApplicationJob
  queue_as :reports_generator_job

  def perform
    Market.of_interest.each do |market|
      MarketAnalyser.new.generate_report(market)
    end
    # Too many markets...
    #op = Market.of_interest.where(has_opportunity: true).where(spread: 4..99).order(spread: :desc)
    #OpportunitiesChannel.broadcast_to( 'arbitrage:1', opportunities: render_opportunities(op) )
  end

  private
  def render_opportunities(op)
    ApplicationController.renderer.render(partial: 'backend/opportunities/opportunities', locals: { markets: op })
  end

end
