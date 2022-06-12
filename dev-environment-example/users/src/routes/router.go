package routes

import (
	controllers "theodo-docker-dojo/user-service/controllers"

	"github.com/gin-gonic/gin"
)

func Init() *gin.Engine {
	router := gin.Default()

	router.GET("/users", controllers.Index)
	router.GET("/users/:id", controllers.Get)
	router.DELETE("/users/:id", controllers.Delete)
	router.POST("/users", controllers.Create)

	return router
}
