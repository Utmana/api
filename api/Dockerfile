FROM node
ADD package.json /app/package.json
WORKDIR /app
RUN npm install --production

ADD lib /app/lib
ADD test /app/test
ADD routes /app/routes
ADD index.js /app/index.js
ADD routes.js /app/routes.js
ENV PORT=3000
EXPOSE 3000
CMD node index.js