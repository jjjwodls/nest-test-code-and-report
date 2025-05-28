echo "📦 Running ALL tests (unit + e2e)..."
yarn test:all:build

if [ $? -eq 0 ]; then
  echo "✅ Tests passed. Proceeding to Docker build..."
  docker build -t nest-app:latest .
  echo "🐳 Docker build completed."
else
  echo "❌ Tests failed. Docker build aborted."
  exit 1
fi
