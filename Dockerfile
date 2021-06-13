## Set up the image
FROM node:14

WORKDIR /app
COPY . .
RUN npm i --only=prod
RUN npm i -g nodemon

RUN echo "Starting service"
CMD ["bash", "./start-service"]