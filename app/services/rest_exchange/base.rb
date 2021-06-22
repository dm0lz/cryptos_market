class RestExchange::Base

  def perform_request base_url, path
    request = HttpRequest.new(base_url)
    response = request.get(path)
    JSON.parse(response)
  end

end
