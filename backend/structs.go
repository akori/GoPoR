package main

import (
	"time"
)

type Person struct {
	ID        int    `db:"id" json:"id"`
	Firstname string `db:"first_name" json:"firstname" binding:"required"`
	Lastname  string `db:"last_name" json:"lastname"`
	Email     string `db:"email" json:"email"`
	CreatedAt int64  `db:"created_at" json:"created_at"`
}

func newPerson(firstname, lastname, email string) Person {
	return Person{
		CreatedAt: time.Now().UnixNano(),
		Firstname: firstname,
		Lastname:  lastname,
		Email:     email,
	}
}
