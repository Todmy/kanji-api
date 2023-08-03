FROM node:16-alpine

RUN apk add --no-cache netcat-openbsd

EXPOSE 3000

CMD while true; do echo 'Docker is running...' | nc -l -p 3000; done
