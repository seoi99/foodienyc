class Api::ReviewsController < ApplicationController
  before_action :require_logged_in, except: :index
  # add Restaurant & user id in all of controller action? b/c user won't type it in frontend
  # we need to get it from route, current user reference...
  # once we create it should be redirected to business show page, so where should we render it to in our backend?
  # is it '/api/businesses/show'?
  # do we need index action? b/c once we create our review, it will be inside of business show page not in our review index backend

  def index
    @reviews = Review.all
  end

  def create
    @review = current_user.reviews.new(review_params)

    if @review.save
      render :show
    else
      render json: @review.errors.full_messages, status: :unprocessable_entity
    end
  end


  def update
    @review = Review.find(params[:id])
    if @review.update(review_params)

      render :show
    else

      render json: @user.errors.full_messages, status: 422
    end
  end

  def destroy
    @review = Review.find(params[:id])
    @review.destroy
    render :show
  end

  private
  def review_params
    params.require(:review).permit(:body, :rating, :business_id)
  end
end
