echo "Building Docker images..."
docker-compose build --no-cache

echo "Starting services..."
docker-compose up
