class Api::UserPicturesController < ApplicationController


  def show
    @userPicture = UserPicture.find_by(user_id: params[:id])
    if @userPicture
      render 'api/user_pictures/show'
    else
      render json: {message: "no profile picture yet"}
    end
  end

  def index
    @userPictures = UserPicture.all
  end

  def create
    
    @userPicture = UserPicture.new(post_params)
    @userPicture.user_id = current_user.id
    if @userPicture.save
      render 'api/user_pictures/show'
    else
      render json: @userPicture.errors.full_messages, status: :unprocessable_entity
    end
  end

  def destroy
    @userPicture = UserPicture.find(params[:id])
    @userPicture.destroy
    render json: {message: "photo deleted"}
  end

  private

  def post_params
    params.require(:user_picture).permit(:photo, :user_id)
  end

end
