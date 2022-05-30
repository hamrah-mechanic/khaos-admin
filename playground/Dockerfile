FROM node

WORKDIR /app
COPY package.json /app
COPY .npmrc /app
COPY package-lock.json /app
RUN npm install  --userconfig=/app/.npmrc


COPY . /app
EXPOSE 3000
RUN "npm" "run" "build"
CMD "npm" "run" "start"
