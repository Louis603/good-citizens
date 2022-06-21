Rails.application.routes.draw do
  resources :markers
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  get '/hello', to: 'application#hello_world'

  get '*path',
      to: 'fallback#index',
      constraints: ->(req) { !req.xhr? && req.format.html? }
end



# import React, { useState, useEffect } from "react";
# import Map from 'react-map-gl';

# function App() {
#   return (
#     <Map
#       initialViewState={{
#         longitude: -73.99283450881435,
#         latitude: 40.715553207343646,
#         zoom: 10
#       }}
#       style={{width: 600, height: 400}}
#       mapStyle="mapbox://styles/mapbox/streets-v9"
#     />
#   );
# }
