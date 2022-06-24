class CommentsController < ApplicationController

    before_action :authorize
    skip_before_action :authorize, only: [:index,:show]

    def index
        comments = Comment.all
        render json: comments, status: :ok
    end

    def show
        comment = Comment.find(params[:id])
        render json: comment, status: :ok
    end

    def create
        comment = Comment.create(comment_params)
        render json: comment, status: :created
    end

    private

    def comment_params
        params.permit(:comment, :user_id, :marker_id)
    end

    def authorize
        render json: {error: "Not authorized" }, status: :unauthorized unless session.include? :current_user
    end
end
