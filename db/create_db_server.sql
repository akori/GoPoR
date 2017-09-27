CREATE TABLE IF NOT EXISTS users (
  id SERIAL, 
  created TIMESTAMP, 
  login TEXT, 
  password TEXT, 
  name TEXT, 
  org INTEGER);