package main

import (
	"database/sql"
	"fmt"
	"github.com/gin-gonic/gin"
	_ "github.com/lib/pq"
	"gopkg.in/gorp.v1"
	"log"
)

var dbmap = initDb()
var timeLayout = "2006-01-02T15:04"

func main() {
	log.Println("main running")

	r := gin.Default()

	api := r.Group("/api/")
	{
		actionItems := api.Group("/actionitems")
		{
			actionItems.GET("/", getActionItems)
			actionItems.GET("/:id", getActionItem)
			actionItems.POST("/", createActionItem)
		}
		completeItems := api.Group("/complete")
		{
			completeItems.GET("/", getCompleteActionItems)
			completeItems.POST("/:id", completeActionItem)
		}
		incompleteActionItems := api.Group("/incomplete")
		{
			incompleteActionItems.GET("/", getIncompleteActionItems)
			incompleteActionItems.POST("/:id", incompleteActionItem)
		}
		deleteActionItems := api.Group("/delete")
		{
			deleteActionItems.POST("/:id", deleteActionItem)
		}
	}
	r.Run(":3001")
}

func initDb() *gorp.DbMap {
	dbCreds := fmt.Sprintf("user=%s password=%s host=%s port=%s dbname=%s sslmode=disable",
		"supermaster",
		"password1",
		"localhost",
		"5432",
		"actonme",
	)

	db, err := sql.Open("postgres", dbCreds)
	checkErr(err, "sql open failed")

	dbmap := &gorp.DbMap{Db: db, Dialect: gorp.PostgresDialect{}}
	dbmap.AddTableWithName(ActionItem{}, "actionitems").SetKeys(true, "Id")

	err = dbmap.CreateTablesIfNotExists()
	checkErr(err, "Create tables failed")

	return dbmap
}

func checkErr(err error, msg string) {
	if err != nil {
		log.Println(msg, err)
	}
}
