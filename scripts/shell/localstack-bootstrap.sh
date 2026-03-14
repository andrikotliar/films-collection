#!/bin/bash
set -e

BUCKET=films-collection-assets
POSTERS_DIR=/posters

echo "Creating bucket..."
awslocal s3 mb s3://$BUCKET || true

if [ -d "$POSTERS_DIR" ]; then
  echo "Syncing files..."
  awslocal s3 sync "$POSTERS_DIR" "s3://$BUCKET/posters"
fi