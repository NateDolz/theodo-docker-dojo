package controllers

import (
	"net/http"
	database "theodo-docker-dojo/user-service/db"

	"github.com/gin-gonic/gin"
)

func Index(c *gin.Context) {
	users, err := database.GetUsers()

	if err != nil {
		c.JSON(http.StatusInternalServerError, err)
	} else {
		c.JSON(http.StatusOK, users)
	}
}
