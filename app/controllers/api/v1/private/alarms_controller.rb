class Api::V1::Private::AlarmsController < Api::V1::Private::BaseController
  def index
    @alarms = current_user.alarms # .active
    render 'api/v1/private/alarms/index.json'
  end

  def create
    # binding.pry
    is_valid_request = params['asset_symbol'].present? && (params['min_limit'].present? || params['max_limit'].present?)
    render_error(code: 422, message: 'Invalid form request', error_fields: {}) && return unless is_valid_request
    asset_info = AssetInfo.find_by(symbol: params['asset_symbol'])
    render_error(code: 422, message: 'Could not find Asset', error_fields: {}) && return unless asset_info
    @alarm = Alarm.new(user_id: current_user.id, asset_info_id: asset_info.id, asset_symbol: asset_info.symbol, min_limit: params['min_limit'], max_limit: params['max_limit'], has_min_limit: params['min_limit'].present?, has_max_limit: params['max_limit'].present?)
    if @alarm.save
      render 'api/v1/private/alarms/show.json'
    else
      render_error(code: 422, message: @alarm.errors.full_messages, error_fields: @alarm.errors) && return
    end
  end

  def toggle_activation
    @alarm = current_user.alarms.find_by(asset_symbol: params['symbol'])
    render_error(code: 422, message: 'Could not find Alarm', error_fields: {}) && return unless @alarm
    @alarm.is_active = !@alarm.is_active
    if @alarm.save
      render 'api/v1/private/alarms/show.json'
    else
      render_error(code: 422, message: @alarm.errors.full_messages, error_fields: @alarm.errors) && return
    end
  end

  def destroy_alarm
    @alarm = current_user.alarms.find_by(asset_symbol: params['symbol'])
    render_error(code: 422, message: 'Could not find Alarm', error_fields: {}) && return unless @alarm
    @alarm.destroy!
    render json: { msg: 'ok' }, status: 204
  end

  def edit_alarm
    @alarm = current_user.alarms.find_by(asset_symbol: alarm_edit_params[:asset_symbol])
    render_error(code: 422, message: 'Could not find Alarm', error_fields: {}) && return unless @alarm
    # is_valid_request = alarm_edit_params["has_min_limit"].present? && (alarm_edit_params["has_max_limit"].present? && alarm_edit_params["max_limit"].present? && alarm_edit_params["min_limit"].present?)
    # render_error(code: 422, message: "Invalid form request", error_fields: {}) && return unless is_valid_request
    # binding.pry
    if @alarm.update_attributes(alarm_edit_params)
      render 'api/v1/private/alarms/show.json'
    else
      render_error(code: 422, message: @alarm.errors.full_messages, error_fields: @alarm.errors) && return
    end
  end

  private

  def alarm_edit_params
    params.require(:symbol).permit(:has_min_limit, :has_max_limit, :max_limit, :min_limit, :asset_symbol)
  end
end
