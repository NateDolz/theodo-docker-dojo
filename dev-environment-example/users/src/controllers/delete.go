package controllers

import (
	"database/sql"
	"net/http"
	"strconv"
	database "theodo-docker-dojo/user-service/db"

	"github.com/gin-gonic/gin"
)

func Delete(c *gin.Context) {
	id := c.Param("id")
	userId, err := strconv.ParseInt(id, 10, 64)

	if err != nil {
		c.JSON(http.StatusBadRequest, "Bad user id")
	}

	user, err := database.DeleteUser(userId)

	if err != nil {
		switch err.Error() {
		case sql.ErrNoRows.Error():
			c.JSON(http.StatusNotFound, err)
		default:
			c.JSON(http.StatusInternalServerError, err)
		}
	} else {
		c.JSON(http.StatusOK, user)
	}
}
