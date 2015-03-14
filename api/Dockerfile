FROM node
ADD . /app
WORKDIR /app
RUN rm -rf node_modules
RUN npm install --production
ENV PORT=3000
EXPOSE 3000
CMD node index.js