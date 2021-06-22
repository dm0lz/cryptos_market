class Api::V1::Public::ContactUsController < Api::V1::BaseController

  def create
    ContactMailerJob.perform_later(contact_params[:email], contact_params[:message])
    render json: {status: 'ok'}
  end

  private
  def contact_params
    params.permit(:email, :message)
  end

end
