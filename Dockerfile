#FROM node:12
#WORKDIR /app
#COPY package*.json ./
#RUN npm install --only=production
#RUN npm install
#RUN npm install --silent
#RUN npm install react-scripts -g
#COPY . .


#RUN npm install -g serve
#RUN npm install
#RUN npm run build
#EXPOSE 3000
#CMD ["serve", "-s", "-l", "8080", "./build"]
#CMD ["npm", "start"]


FROM node as build-deps
WORKDIR /usr/src/app
COPY . ./
RUN yarn
RUN yarn build
RUN yarn global add serve
#RUN serve -s build
EXPOSE 8080
CMD ["serve", "-s", "-l", "8080", "./build"]
#FROM nginx:alpine
#COPY --from=build-deps /usr/src/app/build /usr/share/nginx/html
#EXPOSE 80
#CMD ["nginx", "-g", "daemon off;"]