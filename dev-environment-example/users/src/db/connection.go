package database

import (
	"database/sql"
	"fmt"
	"os"

	_ "github.com/lib/pq"
)

type DbConfig struct {
	User     string
	Password string
	Database string
	Host     string
	Port     string
	SSLMode  string
}

type Connection struct {
	db     *sql.DB
	Config DbConfig
}

func getConfig() DbConfig {
	user := os.Getenv("DB_USER")
	pwd := os.Getenv("DB_PWD")
	database := os.Getenv("DB_NAME")
	host := os.Getenv("DB_HOST")
	port := os.Getenv("DB_PORT")
	ssl := os.Getenv("DB_SSL")

	return DbConfig{
		User:     user,
		Password: pwd,
		Database: database,
		Host:     host,
		Port:     port,
		SSLMode:  ssl,
	}
}

func GetConnection() (*Connection, error) {
	config := getConfig()

	connStr := fmt.Sprintf(
		"user=%s password=%s dbname=%s host=%s port=%s sslmode=%s",
		config.User,
		config.Password,
		config.Database,
		config.Host,
		config.Port,
		config.SSLMode,
	)

	db, err := sql.Open("postgres", connStr)
	if err != nil {
		return nil, err
	}

	connection := &Connection{
		db:     db,
		Config: config,
	}

	return connection, nil
}
