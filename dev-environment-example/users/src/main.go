package main

import (
	"log"
	database "theodo-docker-dojo/user-service/db"
	"theodo-docker-dojo/user-service/routes"

	"github.com/joho/godotenv"
)

func main() {
	err := godotenv.Load(".env")

	// test

	if err != nil {
		log.Fatal("Error initializing environment")
	}

	connection, err := database.GetConnection()

	if err != nil {
		log.Fatal(err)
	}

	// asd

	log.Println("Successfully established connection to database:")
	log.Println(connection.Config.Database)
	log.Println(connection.Config.Host)
	log.Println(connection.Config.Port)

	router := routes.Init()

	router.Run("0.0.0.0:3001")
}
