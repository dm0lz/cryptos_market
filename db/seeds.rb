
#Dir[File.join(Rails.root, 'db', 'seeds', 'exchanges', 'southxchange.rb')].sort.each { |seed| load seed }
Dir[File.join(Rails.root, 'db', 'seeds', 'exchanges', '*.rb')].sort.each { |seed| load seed }


InterestingMarketsFinder.new.call
