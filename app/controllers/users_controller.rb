class UsersController < ApplicationController

    def index
        users = User.all
        render json: users, status: :ok
    end

    def show
        user = User.find_by(id: session[:current_user])
        if user
            render json: user, status: :ok
        else
            render json: { error: "not signed in" }, status: :unauthorized
        end
    end

    def create
        user = User.create!(user_params)
        session[:current_user] = user.id
        render json: user, status: :created

    end


    private

    def user_params
        params.permit(:username, :password)
    end
end
