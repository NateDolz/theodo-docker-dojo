package controllers

import (
	"fmt"
	"net/http"
	"net/http/httputil"
	database "theodo-docker-dojo/user-service/db"

	"github.com/gin-gonic/gin"
)

func Index(c *gin.Context) {
	users, err := database.GetUsers()

	requestDump, err := httputil.DumpRequest(c.Request, true)
	if err != nil {
		fmt.Println(err)
	}
	fmt.Println(string(requestDump))

	if err != nil {
		c.JSON(http.StatusInternalServerError, err)
	} else {
		c.JSON(http.StatusOK, users)
	}
}
