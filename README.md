# real-time-chat
This project will allow different users to communicate with each others by sending messages over different channels. The message sent by one user will be displayed in real time for other users who can access the channel. A user management module will handle authentication. Administrator users will have the the rights for users and channels mangament.

## How to run the project locally

In order to run the projet locally, you need to have a local version of MongoDB running, the front-end Angular app running and the back-end NestJS app running. See below for more details on how to run the different parts.
## Database setup
Create a docker volume:
```bash
docker volume create --name=mongoRealTimeChatData
```
Run the docker container of MongoDB using the volume with the following command:
```bash
docker run --name mongoRealTimeChat -v mongoRealTimeChatData:/data/db -d -p 27017:27017 mongo
```
## Front-end setup
Check readme file inside front-end folder to find instructions on how to run the front-end application.

## Back-end setup
Check readme file inside back-end folder to find instructions on how to run the back-end application.
