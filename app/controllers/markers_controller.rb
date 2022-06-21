class MarkersController < ApplicationController

    def index
        markers = Marker.all
        render json: markers, status: :ok
    end

    def show
        marker = Marker.find(params[:id])
        render json: marker
    end
end
