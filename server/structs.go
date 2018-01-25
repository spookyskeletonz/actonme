package main

import "time"

type ActionItem struct {
	Id        int
	Action    string
	Due       time.Time
	Posted    time.Time
	Actor     string
	Creator   string
	Completed bool
}

func newActionItem(action string, due time.Time, actor string, creator string) ActionItem {
	return ActionItem{
		Action:  action,
		Due:     due,
		Actor:   actor,
		Creator: creator,
	}
}
