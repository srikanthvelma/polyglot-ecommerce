FROM golang:1.21-alpine AS builder
WORKDIR /app
RUN go mod tidy
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN go build -o payment-service

FROM alpine:3.18
WORKDIR /app
COPY --from=builder /app/payment-service .
EXPOSE 8004
CMD ["./payment-service"]
