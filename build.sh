echo "📦 Running ALL tests (unit + e2e)..."
yarn test:all

if [ $? -eq 0 ]; then
  echo "✅ Tests passed. Proceeding to Docker build..."
else
  echo "❌ Tests failed. Docker build aborted."
  exit 1
fi
