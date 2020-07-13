# iot-power-meter-app-ui
## Local run
1. npm ci
1. npm run dev:start

## Configuration
Upon deployment the APP_API_URL variable may be used to reference the API

## How to create a Docker image and run it
1. npm run build
1. mkdir _build
1. cp -a dist package*.json .env _build/
1. cp -R .build _build 
1. docker run --name iot-power-meter-ui -p 4200:80 -d iot-power-meter-app-ui
