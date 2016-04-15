##What for

This is a mean project which is used to manage a team.
This platform will work like a online game.
Members in a team will be treated as a player.
Team tasks will be managed just like a game's task engine dose.
The target is to provide a team manage platform while is fire for everyone and has a lot of fun.

##Deployment with Docker

1. Deploy the MongoDB
`docker run -p 27017:27017 -d -v /your/own/datadir:/data/db --name db yourmongoimage:tag`

2. Download codes of this project
`git clone https://github.com/CannedFish/teammgr4fun`

3. Generate the teammgr4fun Docker image
`cd your_path_of_teammgr4fun && docker build -t teammgr4fun .`

4. Deploy the teammgr4fun
`docker run -p 3000:3000 --link db:db_1 mean`

5. Deploy the teammgr4fun for development
`docker run --rm -p 3000:3000 -p 35729:35729 -p 5858:5858 -v /your/path/of/teammgr4fun/modules:/opt/mean.js/modules --link db:db_1 mean`

