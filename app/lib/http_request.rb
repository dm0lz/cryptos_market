require 'rest-client'
# Considerations :
# from : https://jvns.ca/blog/2016/03/04/whats-up-with-ruby-http-libraries/
#

class HttpRequest

  def initialize host, auth_header = ''
    @host = host
    @auth_header = auth_header
  end

  def get path
    #binding.pry
    begin
      return RestClient.get(
        "#{@host + path}",
        {
          authorization: @auth_header,
          content_type: :json,
          accept: :json,
          user_agent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2227.1 Safari/537.36"
        }
      )
    rescue RestClient::ExceptionWithResponse => e
      puts "RestClient::ExceptionWithResponse Failing at #{@host + path}"
      puts e.response.body
      raise e
    rescue RestClient::RequestFailed => e
      puts "RestClient::RequestFailed at #{@host + path}"
      raise e
    rescue Exception => e
      puts "Exception at #{@host + path}"
      raise e
    end
  end

  def post path, payload
    return RestClient.post(
      "#{@host + path}",
      payload.to_json,
      {
        authorization: @auth_header,
        content_type: :json,
        accept: :json
      }
    )
  end

  def put path, payload
    return RestClient.put(
      "#{@host + path}",
      payload.to_json,
      {
        authorization: @auth_header,
        content_type: :json,
        accept: :json
      }
    )
  end

  def patch path, payload
    return RestClient.patch(
      "#{@host + path}",
      payload.to_json,
      {
        authorization: @auth_header,
        content_type: :json,
        accept: :json
      }
    )
  end

end
