FROM node:16-alpine as runner

COPY . ./

RUN npm install

RUN npm run build

ENV NEXT_TELEMETRY_DISABLED 1

EXPOSE 3000
ENV PORT 3000

CMD [ "npm", "run", "start" ]