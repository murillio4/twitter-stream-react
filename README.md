# About
This is a small twitter live stream web application written in react and nodejs. The application consists of a client written in react and a very simplified websocket server written in nodejs. 

# Improvments that could be made
  1. Some parts of the application may not be written in the best "react" way. Some improvements here.
  2. If you hard refresh the page, filter settings are resetted. To fix this a URL query containing filter information could be implemented. 
  3. Improve git usage by implementing quidelines like https://chris.beams.io/posts/git-commit/
  4. Write the client more mobile friendly
  5. Write tests for the react components.

# Overall thoughts
Great task that proved to be more demanding than I thought. Time consumed; about 3 full workdays (this could be reduced dramatically if I had more experience with react)

# How to run the application
1. yarn or npm to install all depending packages
2. run "start" script to run both server and client
3. opt. if you want to build the react app this can be done with "build" script and server can be ran alone with "start-server"