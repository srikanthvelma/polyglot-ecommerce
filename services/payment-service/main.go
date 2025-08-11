package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/go-redis/redis/v8"
	"golang.org/x/net/context"
)

var ctx = context.Background()
var rdb *redis.Client

type Payment struct {
	ID        string `json:"id"`
	OrderID   string `json:"order_id"`
	Amount    string `json:"amount"`
	Status    string `json:"status"`
}

func main() {
	redisAddr := os.Getenv("REDIS_ADDR")
	if redisAddr == "" {
		redisAddr = "redis-payment:6379"
	}

	rdb = redis.NewClient(&redis.Options{
		Addr: redisAddr,
	})

	http.HandleFunc("/payments", createPayment)
	http.HandleFunc("/payments/", getPayment)

	port := "8004"
	fmt.Printf("Payment service listening on port %s\n", port)
	log.Fatal(http.ListenAndServe(":"+port, nil))
}

func createPayment(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Invalid method", http.StatusMethodNotAllowed)
		return
	}

	var payment Payment
	if err := json.NewDecoder(r.Body).Decode(&payment); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	payment.Status = "SUCCESS"

	data, _ := json.Marshal(payment)
	err := rdb.Set(ctx, payment.ID, data, 0).Err()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(payment)
}

func getPayment(w http.ResponseWriter, r *http.Request) {
	id := r.URL.Path[len("/payments/"):]
	val, err := rdb.Get(ctx, id).Result()
	if err != nil {
		http.Error(w, "Payment not found", http.StatusNotFound)
		return
	}

	var payment Payment
	json.Unmarshal([]byte(val), &payment)

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(payment)
}
