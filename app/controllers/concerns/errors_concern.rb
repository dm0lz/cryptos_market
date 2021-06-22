module ErrorsConcern
  extend ActiveSupport::Concern

  included do
    def render_error(json_error)
      @error = json_error
      render 'api/v1/empty.json', status: json_error[:code]
    end
  end
end
