# About
This is a small twitter live stream web application written in react and nodejs. The application consists of a client written in react and a very simplified websocket server written in nodejs. 

# Thinks that could be improved
The first thing I would like to point out is that this was my first time really working with react. Therefore some parts of the application may not be written in the best "react" way. So one thing that could be improved is application flow.
If you hard refresh the page filter settings are resetted. To fix this a URL query containing filter information could be implemented. 
The git commits and commit messages is one thing that could be done so much better. After reading an article about how important they can be, and how easy debugging can be if they are committed and written right and not in big chunks I've done in some of my commits.
The website could be more mobile friendly, so this is something that could be worked on aswell.

# Overall thoughts
Great task that proved to be more demanding than I thought. Time consumed; about 2-2,5 full workdays (this could be reduced dramatically if I had more experience with react)

# How to run the application
1. yarn or npm to install all dependign packages
2. run "start" script to run both server and client
3. opt. if you want to build the react app this can be done with "build" script and server can be ran alone with "start-server"