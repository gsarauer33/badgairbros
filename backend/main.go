package main

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"os"

	supabase "github.com/nedpals/supabase-go"
)

type ProfitRecord struct {
	ID           int     `json:"id"`
	FieldName    string  `json:"field_name"`
	YieldPerAcre float64 `json:"yield_per_acre"`
	CostPerAcre  float64 `json:"cost_per_acre"`
	OwnerID      string  `json:"owner_id"`
}

func main() {
	http.HandleFunc("/admin/compute-all", handleComputeAll)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	log.Printf("Admin backend listening on port %s ...", port)
	if err := http.ListenAndServe(":"+port, nil); err != nil {
		log.Fatal(err)
	}
}

func handleComputeAll(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method Not Allowed", http.StatusMethodNotAllowed)
		return
	}

	serviceRoleKey := os.Getenv("SUPABASE_SERVICE_ROLE_KEY")
	if serviceRoleKey == "" {
		http.Error(w, "Missing service role key", http.StatusInternalServerError)
		return
	}

	// Replace with your actual Supabase project URL
	supabaseUrl := "https://YOUR_PROJECT.supabase.co"

	client := supabase.CreateClient(supabaseUrl, serviceRoleKey)
	ctx := context.Background()

	var allRecords []ProfitRecord
	err := client.DB.From("profit_data").
		Select("*").
		Execute(ctx, &allRecords)
	if err != nil {
		http.Error(w, "Error reading profit_data: "+err.Error(), http.StatusInternalServerError)
		return
	}

	var totalProfit float64
	for _, rec := range allRecords {
		totalProfit += (rec.YieldPerAcre - rec.CostPerAcre)
	}

	fmt.Fprintf(w, "Total profit across all fields: %.2f\n", totalProfit)
}
