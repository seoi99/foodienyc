class Api::BusinessesController < ApplicationController

  def index
    @businesses = Business.all.limit(30)
  end

  def show
    @business = Business.find(params[:id])
  end

  def search
    if params[:result] != "undefined"
      @businesses = Business.where("business_name ILIKE :result OR category ILIKE :result ", result: "%#{params[:result]}%").limit(30)
    else
      @businesses = Business.all.limit(30)
    end
    render :index
  end

  private
  def business_params
    params.require(:business).permit(:business_name, :full_address, :latitude, :longitude, :category)
  end
end
