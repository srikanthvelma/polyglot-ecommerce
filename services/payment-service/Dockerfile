FROM golang:1.21-alpine AS builder
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod tidy
RUN go mod download
# Ensure the go.mod and go.sum files are copied before the rest of the code
# to leverage Docker's caching mechanism.
# This will prevent unnecessary rebuilds when only application code changes.

COPY . .
RUN go build -o payment-service

FROM alpine:3.18
WORKDIR /app
COPY --from=builder /app/payment-service .
EXPOSE 8004
CMD ["./payment-service"]
