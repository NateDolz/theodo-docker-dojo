package main

import (
	"log"
	"net/http"
	"theodo-docker-dojo/user-service/controllers"
	database "theodo-docker-dojo/user-service/db"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Header("Access-Control-Allow-Origin", "*")
		c.Header("Content-Type", "application/json")
		c.Header("Access-Control-Allow-Headers", "*")
		c.Header("Access-Control-Allow-Methods", "*")

		if c.Request.Method != "OPTIONS" {
			c.Next()
		} else {
			c.AbortWithStatus(http.StatusOK)
		}

	}
}

func main() {
	err := godotenv.Load(".env")

	if err != nil {
		log.Fatal("Error initializing environment")
	}

	connection, err := database.GetConnection()

	if err != nil {
		log.Fatal(err)
	}

	log.Println("Successfully established connection to database:")
	log.Println(connection.Config.Database)
	log.Println(connection.Config.Host)
	log.Println(connection.Config.Port)

	router := gin.Default()

	router.Use(CORSMiddleware()).
		GET("/users", controllers.Index).
		GET("/users/:id", controllers.Get).
		DELETE("/users/:id", controllers.Delete).
		POST("/users", controllers.Create)

	router.Run("0.0.0.0:3001")
}
