FROM node:10.15.3

WORKDIR /app

COPY . /app

RUN npm install -g yarn \
    && yarn global add pm2 \
    && yarn \
    && yarn build

EXPOSE 3300

CMD ["yarn", "uat"]
