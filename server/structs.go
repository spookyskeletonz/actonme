package main

import "time"

type ActionItem struct {
	Id         int       `json:"id"`
	Action     string    `json:"action" binding:"required"`
	Due        time.Time `json:"due" binding:"required"`
	Posted     time.Time `json:"posted"`
	Actor      string    `json:"actor" binding:"required"`
	Creator    string    `json:"creator" binding:"required"`
	Completed  bool      `json:"completed"`
	Inprogress bool      `json:"inprogress"`
}

func newActionItem(action string, due time.Time, actor string, creator string) ActionItem {
	return ActionItem{
		Action:  action,
		Due:     due,
		Actor:   actor,
		Creator: creator,
		Posted:  time.Now(),
	}
}
