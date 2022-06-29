CREATE TABLE IF NOT EXISTS users(
  id SERIAL CONSTRAINT users_pk PRIMARY KEY,
  first_name varchar(255) NOT NULL,
  last_name varchar(255) NOT NULL,
  email varchar(255) DEFAULT ''
);

CREATE TABLE IF NOT EXISTS todos (
  id SERIAL CONSTRAINT todos_pk PRIMARY KEY,
  assigned_to INT REFERENCES users(id),
  details TEXT DEFAULT '',
  completed BOOLEAN DEFAULT false
);