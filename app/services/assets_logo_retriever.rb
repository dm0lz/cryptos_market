class AssetsLogoRetriever

  def initialize
  end

  def call

    request = HttpRequest.new('https://www.cryptocompare.com')
    response = request.get('/api/data/coinlist/')
    res = JSON.parse(response)["Data"]

    res.each do |infos|
      asset_info = AssetInfo.find_by(symbol: infos.first)
      if asset_info
        path = infos.last["ImageUrl"]
        return unless path
        pic_url = 'https://www.cryptocompare.com' + path
        asset_info.logo = URI.parse(pic_url)
        asset_info.save!
      else
        puts 'no asset info for ' + infos.first
      end
    end

    # In case it it did not work well :
    res.each do |infos|
      asset_info = AssetInfo.find_by(symbol: infos.first)
      if asset_info
        unless asset_info.logo_file_name # should not happen...
          path = infos.last["ImageUrl"]
          if path
            asset_info.logo = 'https://www.cryptocompare.com' + path
            asset_info.save!
            puts "added logo to #{asset_info.symbol}"
          else
            puts "no path for #{asset_info.symbol}"
          end
        end
      end
    end

  end

end
