package controllers

import (
	"net/http"
	database "theodo-docker-dojo/user-service/db"

	"github.com/gin-gonic/gin"
)

type createRequest struct {
	FirstName string `json:"first_name"`
	LastName  string `json:"last_name"`
}

func Create(c *gin.Context) {
	var body createRequest

	c.BindJSON(&body)

	if body.FirstName == "" {
		c.JSON(http.StatusBadRequest, "Body must contain the name of the user to create")
		return
	}

	if body.LastName == "" {
		c.JSON(http.StatusBadRequest, "Body must contain the name of the user to create")
		return
	}

	user, err := database.AddUser(body.FirstName, body.LastName)

	if err != nil {
		c.JSON(http.StatusInternalServerError, err)
	} else {
		c.JSON(http.StatusOK, user)
	}
}
