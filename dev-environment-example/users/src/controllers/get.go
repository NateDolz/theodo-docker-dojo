package controllers

import (
	"database/sql"
	"net/http"
	"strconv"
	database "theodo-docker-dojo/user-service/db"

	"github.com/gin-gonic/gin"
)

func Get(c *gin.Context) {
	id := c.Param("id")
	userId, err := strconv.ParseInt(id, 10, 64)

	if err != nil {
		c.IndentedJSON(http.StatusBadRequest, "Bad user id")
	}

	user, err := database.GetUser(userId)

	if err != nil {
		switch err.Error() {
		case sql.ErrNoRows.Error():
			c.IndentedJSON(http.StatusNotFound, err)
		default:
			c.IndentedJSON(http.StatusInternalServerError, err)
		}
	} else {
		c.IndentedJSON(http.StatusOK, user)
	}
}
