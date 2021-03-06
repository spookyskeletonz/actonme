package main

import (
	"github.com/gin-gonic/gin"
	_ "github.com/lib/pq"
	"log"
	"net/http"
)

func getActionItems(c *gin.Context) {
	log.Println("getting all items")
	orderBy := c.DefaultQuery("orderby", "due")
	var items []ActionItem
	var err error
	_, err = dbmap.Select(&items, "select * from actionitems order by "+orderBy)
	if err != nil {
		c.JSON(http.StatusNotFound, items)
		log.Println(err.Error())
	}
	c.JSON(http.StatusOK, items)
}

func getActionItem(c *gin.Context) {
	log.Println("getting single item")
	var item ActionItem
	var err error
	id := c.Params.ByName("id")
	err = dbmap.SelectOne(&item, "select * from actionitems where id = "+id)
	if err != nil {
		c.JSON(http.StatusNotFound, nil)
		return
	}
	c.JSON(http.StatusOK, item)
}

func createActionItem(c *gin.Context) {
	log.Println("creating action item")
	var item ActionItem
	err := c.BindJSON(&item)
	if err == nil {
		a := newActionItem(item.Action, item.Due, item.Actor, item.Creator)
		err = dbmap.Insert(&a)
		checkErr(err, "insert failed")
		c.JSON(http.StatusCreated, item)
	} else {
		log.Println("Error in post request: ", err)
	}
}

func completeActionItem(c *gin.Context) {
	log.Println("setting item to complete")
	var item ActionItem
	id := c.Params.ByName("id")
	var err error
	var count int64
	err = dbmap.SelectOne(&item, "select * from actionitems where id = "+id)
	if err != nil {
		c.JSON(http.StatusNotFound, nil)
		return
	}
	item.Completed = true
	item.Inprogress = false
	count, err = dbmap.Update(&item)
	if count == 0 {
		c.JSON(http.StatusNotFound, nil)
	}
	if err != nil {
		c.JSON(http.StatusBadRequest, nil)
		return
	}
	c.JSON(http.StatusOK, item)
}

func setInProgressActionItem(c *gin.Context) {
	log.Println("setting item in progress")
	var item ActionItem
	id := c.Params.ByName("id")
	var err error
	var count int64
	err = dbmap.SelectOne(&item, "select * from actionitems where id = "+id)
	if err != nil {
		c.JSON(http.StatusNotFound, nil)
		return
	}
	item.Inprogress = true
	item.Completed = false
	count, err = dbmap.Update(&item)
	if count == 0 {
		c.JSON(http.StatusNotFound, nil)
	}
	if err != nil {
		c.JSON(http.StatusBadRequest, nil)
		return
	}
	c.JSON(http.StatusOK, item)
}

func unSetInProgressActionItem(c *gin.Context) {
	log.Println("setting item out of progress")
	var item ActionItem
	id := c.Params.ByName("id")
	var err error
	var count int64
	err = dbmap.SelectOne(&item, "select * from actionitems where id = "+id)
	if err != nil {
		c.JSON(http.StatusNotFound, nil)
		return
	}
	item.Inprogress = false
	item.Completed = false
	count, err = dbmap.Update(&item)
	if count == 0 {
		c.JSON(http.StatusNotFound, nil)
	}
	if err != nil {
		c.JSON(http.StatusBadRequest, nil)
		return
	}
	c.JSON(http.StatusOK, item)
}

func incompleteActionItem(c *gin.Context) {
	log.Println("setting item to inprogress")
	var item ActionItem
	id := c.Params.ByName("id")
	var err error
	var count int64
	err = dbmap.SelectOne(&item, "select * from actionitems where id = "+id)
	if err != nil {
		c.JSON(http.StatusNotFound, nil)
		return
	}
	item.Completed = false
	item.Inprogress = true
	count, err = dbmap.Update(&item)
	if count == 0 {
		c.JSON(http.StatusNotFound, nil)
	}
	if err != nil {
		c.JSON(http.StatusBadRequest, nil)
		return
	}
	c.JSON(http.StatusOK, item)
}

func getCompleteActionItems(c *gin.Context) {
	log.Println("getting all complete items")
	orderBy := c.DefaultQuery("orderby", "due")
	var items []ActionItem
	var err error
	_, err = dbmap.Select(&items, "select * from actionitems where completed = true order by "+orderBy)
	if err != nil {
		c.JSON(http.StatusNotFound, items)
		return
	}
	c.JSON(http.StatusOK, items)
}

func getIncompleteActionItems(c *gin.Context) {
	log.Println("getting all incomplete items")
	orderBy := c.DefaultQuery("orderby", "due")
	var items []ActionItem
	var err error
	_, err = dbmap.Select(&items, "select * from actionitems where inprogress = false and completed = false order by "+orderBy)
	if err != nil {
		c.JSON(http.StatusNotFound, items)
		return
	}
	c.JSON(http.StatusOK, items)
}

func getInProgressActionItems(c *gin.Context) {
	log.Println("getting in porgress items")
	orderBy := c.DefaultQuery("orderby", "due")
	var items []ActionItem
	var err error
	_, err = dbmap.Select(&items, "select * from actionitems where inprogress = true order by "+orderBy)
	if err != nil {
		c.JSON(http.StatusNotFound, items)
		return
	}
	c.JSON(http.StatusOK, items)
}

func deleteActionItem(c *gin.Context) {
	log.Println("deleting an action item")
	var item ActionItem
	var err error
	id := c.Params.ByName("id")
	err = dbmap.SelectOne(&item, "select * from actionitems where id = "+id)
	if err != nil {
		c.JSON(http.StatusNotFound, nil)
		return
	}
	var count int64
	count, err = dbmap.Delete(&item)
	if count == 0 {
		c.JSON(http.StatusNotFound, nil)
	}
	if err != nil {
		c.JSON(http.StatusBadRequest, nil)
		return
	}
	c.JSON(http.StatusOK, item)
}
