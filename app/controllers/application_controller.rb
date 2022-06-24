class ApplicationController < ActionController::API
    include ActionController::Cookies

    def hello_world
      byebug
        session[:count] = (session[:count] || 0) + 1
        render json: { count: session[:count] }
      end
end
