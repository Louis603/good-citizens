class MarkersController < ApplicationController
# rescue_from ActiveRecord::RecordInvalid, with: :invalid

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

    private

    def marker_params
        params.permit(:name, :description, :image, :longitude, :latitude, :user_id)
    end

    def invalid
        render json: { error: "Unprocessable entity" }, status: :unprocessable_entity
    end
end
