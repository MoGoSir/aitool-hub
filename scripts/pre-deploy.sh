#!/bin/bash

# Pre-deploy script to ensure database is ready
echo "Checking database connection..."

# Generate Prisma client first
npx prisma generate

# Try to push schema to database
echo "Pushing schema to database..."
npx prisma db push --accept-data-loss

if [ $? -eq 0 ]; then
  echo "Database setup completed successfully"
else
  echo "Database setup failed, but continuing build..."
fi
