# theodo-docker-dojo

## docker commands for simple app

### Build the image

Command builds the local docker file relative to `.` and tags it with the docker hub repository and image name and version
`docker build --tag natedolz/theodo-dojo:hello-latest .`

### Push the image

`docker push natedolz/theodo-dojo:hello-beta`

### Run the image 

Command runs an image the `-i` and `-t` flag work together to keep the image open in the terminal reading and writing output.
The `-p` argument tells docker to forward the container's port at `8080` to the host OS's local port at `3000` lastly the image to run is specified
`docker run -i -t -p 3000:8080 natedolz/theodo-dojo:hello-latest`
