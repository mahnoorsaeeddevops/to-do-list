# Small, official Node image
FROM node:20-alpine

# App lives here inside the container
WORKDIR /app

# Copy dependency manifests first so Docker can cache the npm install layer
# (this layer only re-runs if package.json changes, not on every code change)
COPY package.json ./

RUN npm install --omit=dev

# Now copy the rest of the source code
COPY . .

# The app listens on this port (see server.js)
EXPOSE 3000

CMD ["node", "server.js"]
