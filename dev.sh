is_port_in_use() {
    netstat -tuln | grep -q ":$1 " 
}

PORTS=(3306 3000 4000)

for PORT in "${PORTS[@]}"; do
    if is_port_in_use "$PORT"; then
        echo "Error: Port $PORT is already in use. Please free it and try again."
        exit 1
    fi
done

echo "Ports are free. Proceeding with Docker setup..."

echo "Starting development environment..."
docker-compose up -d

echo "Docker services have been started. Waiting for services to initialize..."
sleep 10

echo "Application is running..."

echo "Tailing logs for backend and client..."
docker logs -f text-analyzer-tool-app-1 & 
docker logs -f text-analyzer-tool-client-1 &

wait 
