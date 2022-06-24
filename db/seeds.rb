# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
Marker.destroy_all
User.destroy_all
Comment.destroy_all

louis = User.create(username: "Louis", password_digest: 123)
mark = User.create(username: "Mark", password_digest: 123)

marker1= Marker.create(name: "test",                                                                     
    description: "test",                                                              
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/One-man_band_street_performer_-_5.jpg/1200px-One-man_band_street_performer_-_5.jpg",
    # coordinates: ["-73.9982512301368", "40.71582478983029"], 
    longitude: "-73.9982512301368",
    latitude: "40.71582478983029",                   
    user: louis)

marker2= Marker.create(name: "test2",                                                                     
    description: "test2",                                                              
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/One-man_band_street_performer_-_5.jpg/1200px-One-man_band_street_performer_-_5.jpg",
    # coordinates: ["-74.00175164473272", "40.73940602313252"],  
    longitude: "-74.00175164473272",
    latitude: "40.73940602313252",                          
    user: mark)

comment1 = Comment.create(comment: "testing testing", user: louis, marker: marker1)
comment2 = Comment.create(comment: "testing2 testing2", user: mark, marker: marker2)