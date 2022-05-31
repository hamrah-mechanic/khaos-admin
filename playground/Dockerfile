FROM node

WORKDIR /app
COPY package.json /app
COPY .npmrc /app
RUN npm cache clean --force 
RUN npm install  --userconfig=/app/.npmrc


COPY . /app
EXPOSE 3000
RUN "npm" "run" "build"
CMD "npm" "run" "start"
