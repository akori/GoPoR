package main

import (
	"database/sql"
	"fmt"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	_ "github.com/lib/pq"
	"gopkg.in/gorp.v1"
)

var dbmap = initDb()

const (
	host     = "db"
	port     = 5432
	user     = "postgres"
	password = "secret"
	dbname   = "postgres"
)

func getPeople(c *gin.Context) {
	// fetch all rows
	var people []Person
	var err error
	_, err = dbmap.Select(&people, "select * from people order by id")
	checkErr(err, "Select failed")
	c.JSON(http.StatusOK, people)
}

func getPerson(c *gin.Context) {
	// fetch one row
	id := c.Params.ByName("id")
	var person Person
	var err error
	err = dbmap.SelectOne(&person, "select * from people where id = $1", id)

	if err == nil {
		c.JSON(http.StatusOK, person)
		return
	}
	c.JSON(http.StatusNotFound, nil)
}

func createPerson(c *gin.Context) {
	var person Person
	// check for errors
	if c.BindJSON(&person) == nil {
		p := newPerson(person.Firstname, person.Lastname, person.Email)
		var err = dbmap.Insert(&p)
		checkErr(err, "Insert failed")
		c.JSON(http.StatusCreated, p)
	}
}

func updatePerson(c *gin.Context) {
	id := c.Params.ByName("id")
	log.Println(id)
	var person Person
	var err error
	err = dbmap.SelectOne(&person, "select * from people where id = $1", id)

	if err == nil && c.BindJSON(&person) == nil {
		dbmap.Update(&person)
		c.JSON(http.StatusOK, person)
		return
	}
	c.JSON(http.StatusNotFound, nil)
	checkErr(err, "Select failed")
}

func deletePerson(c *gin.Context) {
	id := c.Params.ByName("id")

	// delete row by PK
	var person Person
	var err error
	var count int64
	err = dbmap.SelectOne(&person, "select * from people where id = $1", id)
	count, err = dbmap.Delete(&person)
	log.Println(count)
	if count == 1 {
		log.Println("Rows deleted:", count)
		c.JSON(http.StatusOK, person)
		return
	}
	c.JSON(http.StatusNotFound, nil)
	checkErr(err, "Delete failed")
}

func main() {
	//defer db.Close()
	log.Println("Main running")
	r := gin.Default()

	v1 := r.Group("/api/v1")
	{
		people := v1.Group("/people")
		{
			people.GET("/", getPeople)
			people.POST("/", createPerson)
			people.PUT("/:id", updatePerson)
			people.DELETE("/:id", deletePerson)
			people.GET("/:id", getPerson)
		}
	}
	r.Run(":3001")
}

func initDb() *gorp.DbMap {
	dbinfo := fmt.Sprintf("host=%s port=%d user=%s password=%s dbname=%s sslmode=disable",
		host, port, user, password, dbname)

	db, err := sql.Open("postgres", dbinfo)
	checkErr(err, "sql.Open failed")

	// construct a gorp DbMap
	dbmap := &gorp.DbMap{Db: db, Dialect: gorp.PostgresDialect{}}

	// add a table, setting the table name to 'posts' and
	// specifying that the Id property is an auto incrementing PK
	dbmap.AddTableWithName(Person{}, "people").SetKeys(true, "id")

	// create the table. in a production system you'd generally
	// use a migration tool, or create the tables via scripts
	err = dbmap.CreateTablesIfNotExists()
	checkErr(err, "Create tables failed")

	return dbmap
}

func checkErr(err error, msg string) {
	if err != nil {
		log.Fatalln(msg, err)
	}
}
