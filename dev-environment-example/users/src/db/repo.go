package database

import (
	"database/sql"
	"errors"
)

type User struct {
	Id   int64  `json:"id"`
	Name string `json:"name"`
}

var (
	ErrDuplicateUser = errors.New("cannot create a dublicate user")
)

func doesUserExist(connection *Connection, name string) (bool, error) {
	q := `SELECT id FROM users WHERE name = $1;`

	var id int64
	err := connection.db.QueryRow(q, name).Scan(&id)

	if err == sql.ErrNoRows {
		return false, nil
	}

	return true, err
}

func GetUsers() (*[]User, error) {
	connection, err := GetConnection()

	if err != nil {
		return nil, err
	}

	q := `SELECT id, name FROM users;`
	rows, err := connection.db.Query(q)

	if err != nil {
		return nil, err
	}

	defer rows.Close()

	var users []User

	for rows.Next() {
		var (
			id   int64
			name string
		)
		if err := rows.Scan(&id, &name); err != nil {
			return nil, err
		}
		users = append(users, User{Id: id, Name: name})
	}

	return &users, nil
}

func GetUser(userId int64) (*User, error) {
	connection, err := GetConnection()

	if err != nil {
		return nil, err
	}

	q := `SELECT id, name FROM users WHERE id = $1;`
	row := connection.db.QueryRow(q, userId)

	var (
		id   int64
		name string
	)

	err2 := row.Scan(&id, &name)

	return &User{Id: id, Name: name}, err2
}

func AddUser(name string) (int64, error) {
	connection, err := GetConnection()

	if err != nil {
		return -1, err
	}

	exists, err := doesUserExist(connection, name)

	if err != nil {
		return -1, err
	}

	if exists {
		return -1, ErrDuplicateUser
	}

	q := `INSERT INTO users (name) VALUES ($1) RETURNING id;`

	var id int64
	err2 := connection.db.QueryRow(q, name).Scan(&id)

	return id, err2
}

func DeleteUser(userId int64) (bool, error) {
	connection, err := GetConnection()

	if err != nil {
		return false, err
	}

	q := `DELETE FROM users where id = $1;`

	res, err := connection.db.Exec(q, userId)

	if err != nil {
		return false, err
	}

	rows, err := res.RowsAffected()

	if err != nil {
		return false, err
	}

	return rows > 0, nil
}
