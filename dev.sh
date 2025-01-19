echo "Starting development environment..."
docker-compose up -d

echo "Docker services have been started. Waiting for services to initialize..."
sleep 10

echo "Application is running..."
docker logs -f text-analyzer-tool-app-1  
