#!/bin/bash
set -e

BUCKET=films-collection-assets
POSTERS_DIR=/posters

echo "Creating bucket..."
awslocal s3 mb s3://$BUCKET || true

echo "Applying CORS..."
awslocal s3api put-bucket-cors \
  --bucket $BUCKET \
  --cors-configuration file:///aws-config/cors.json

if [ -d "$POSTERS_DIR" ]; then
  echo "Syncing files..."
  awslocal s3 sync "$POSTERS_DIR" "s3://$BUCKET/posters --quiet"
fi