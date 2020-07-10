# iot-power-meter-app-ui

## How to create a Docker image and run it
1. npm run build
1. mkdir -p _package/dist
1. cp -a dist package*.json _package/
1. cd _package  && npm pack && cd ..
1. mkdir _build
1. cp -R .build _build 
1. cp .env _build 
1. tar -xzf _package/iot-power-meter-app-ui-*.tgz --strip-components=1 -C _build
1. docker run --name iot-power-meter-ui -p 4200:80 -d iot-power-meter-app-ui
