package controllers

import (
	"net/http"
	database "theodo-docker-dojo/user-service/db"

	"github.com/gin-gonic/gin"
)

type createRequest struct {
	Name string `json:"name"`
}

func Create(c *gin.Context) {
	var body createRequest

	c.BindJSON(&body)

	if body.Name == "" {
		c.IndentedJSON(http.StatusBadRequest, "Body must contain the name of the user to create")
	}

	user, err := database.AddUser(body.Name)

	if err != nil {
		c.IndentedJSON(http.StatusInternalServerError, err)
	} else {
		c.IndentedJSON(http.StatusOK, user)
	}
}
