package main

import (
	"database/sql"
	"fmt"
	//"github.com/gin-gonic/gin"
	"gopkg.in/gorp.v1"
	"log"
	/* "net/http" */
	/* "os" */
	_ "github.com/lib/pq"
	"time"
)

var dbmap = initDb()

func main() {
	actionItem := newActionItem("first post", time.Now(), "neil", "sam")
	var err = dbmap.Insert(&actionItem)
	checkErr(err, "insert fialed")
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
		log.Fatalln(msg, err)
	}
}
