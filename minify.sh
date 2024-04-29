#!/bin/bash
set -e

cd "$(dirname "$0")/javascript"

if [ ! -f "index.js" ]; then
  echo "full-index.js not found"
  exit 1
fi

minify index.js > index.min.js

if [ $? -ne 0 ]; then
  echo "Minification failed"
  exit 1
fi

echo "Successfully minified JS"

cd ..

cd "$(dirname "$0")/styles"

if [ ! -f "styles.css" ]; then
  echo "styles.css not found"
  exit 1
fi

minify styles.css > styles.min.css

if [ $? -ne 0 ]; then
  echo "Minification failed"
  exit 1
fi

echo "Successfully minified CSS"

exit 0
