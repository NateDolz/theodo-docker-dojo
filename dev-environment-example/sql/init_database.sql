CREATE TABLE IF NOT EXISTS users(
  id SERIAL CONSTRAINT users_pk PRIMARY KEY,
  name TEXT
);

CREATE TABLE IF NOT EXISTS todos (
  id SERIAL CONSTRAINT todos_pk PRIMARY KEY,
  assigned_to INT REFERENCES users(id),
  details TEXT,
  completed BOOLEAN
);