package main

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

type genericResponse struct {
	Message string `json:"message"`
}

func ping(c *gin.Context) {
	c.IndentedJSON(
		http.StatusOK,
		genericResponse{
			Message: "pong",
		},
	)
}

func hello(c *gin.Context) {
	c.IndentedJSON(
		http.StatusOK,
		genericResponse{
			Message: "Hello World!",
		},
	)
}

func helloName(ctx *gin.Context) {
	name := ctx.Param("name")

	ctx.IndentedJSON(
		http.StatusOK,
		genericResponse{
			Message: fmt.Sprintf("Hello %s!", name),
		},
	)
}

func main() {
	router := gin.Default()
	router.GET("/ping", ping)
	router.GET("/hello", hello)
	router.GET("/hello/:name", helloName)

	router.Run("0.0.0.0:8080")
}
