package main

import (
	"database/sql"
	"fmt"
	"github.com/gin-gonic/gin"
	_ "github.com/lib/pq"
	"gopkg.in/gorp.v1"
	"log"
	"net/http"
	"time"
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
	}
	r.Run(":3001")
}

func getActionItems(c *gin.Context) {
	log.Println("getting all items")
	orderBy := c.DefaultQuery("orderby", "id")
	log.Println(orderBy)
	var items []ActionItem
	var err error
	_, err = dbmap.Select(&items, "select * from actionitems order by "+orderBy)
	if err != nil {
		c.JSON(http.StatusNotFound, items)
		return
	}
	c.JSON(http.StatusOK, items)
}

func getActionItem(c *gin.Context) {
	log.Println("getting single item")
	var item ActionItem
	var err error
	id := c.Params.ByName("id")
	err = dbmap.SelectOne(&item, "select * from actionitems where id = $1", id)
	if err == nil {
		c.JSON(http.StatusOK, item)
		return
	}
	c.JSON(http.StatusNotFound, nil)
}

func createActionItem(c *gin.Context) {
	log.Println("creating action item")
	var item ActionItem
	var err error
	item.Action = c.PostForm("action")
	item.Actor = c.PostForm("actor")
	item.Creator = c.PostForm("creator")
	item.Due, _ = time.Parse(timeLayout, c.PostForm("due"))
	item.Posted = time.Now()

	err = dbmap.Insert(&item)
	checkErr(err, "insert failed")
	c.JSON(http.StatusCreated, item)
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
