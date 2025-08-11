#!/bin/sh
set -e

echo "Waiting for Redis to start..."
sleep 3

if command -v redis-cli > /dev/null; then
  echo "Loading payment data into Redis..."
  PAYMENTS=$(cat /data/payments.json)

  # Store each payment as JSON string under key payments:<payment_id>
  echo "$PAYMENTS" | jq -c '.[]' | while read -r payment; do
    ID=$(echo "$payment" | jq -r '.payment_id')
    redis-cli -h redis SET "payments:${ID}" "$payment"
  done

  echo "✅ Payment data loaded successfully."
else
  echo "❌ redis-cli not found. Skipping payment data load."
fi
