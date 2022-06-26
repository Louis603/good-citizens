class MarkersController < ApplicationController
# rescue_from ActiveRecord::RecordInvalid, with: :invalid

    before_action :authorize
    skip_before_action :authorize, only: [:index,:show]


    def index
        markers = Marker.all
        render json: markers, status: :ok
    end

    def show
        marker = Marker.find(params[:id])
        render json: marker
    end

    def create
        marker = Marker.create!(name: params[:name], description:params[:description], image:params[:image], longitude:params[:longitude], latitude:params[:latitude])
        render json: marker, status: :created
    end

    def destroy
        marker = Marker.find(params[:id])
        marker.destroy
        head :no_content
    end

    private

    def marker_params
        params.permit(:name, :description, :image, :longitude, :latitude, :user_id)
    end

    def invalid
        render json: { error: "Unprocessable entity" }, status: :unprocessable_entity
    end

    def authorize
        render json: {error: "Please sign in to add a moment" }, status: :unauthorized unless session.include? :current_user
    end
end
