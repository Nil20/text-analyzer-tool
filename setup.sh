is_port_in_use() {
    netstat -tuln | grep -q ":$1 " 
}

PORTS=(3306 3000)

for PORT in "${PORTS[@]}"; do
    if is_port_in_use "$PORT"; then
        echo "Error: Port $PORT is already in use. Please free it and try again."
        exit 1
    fi
done

echo "Ports are free. Proceeding with Docker setup..."

echo "Building Docker images..."
docker-compose build --no-cache

echo "Starting services..."
docker-compose up
