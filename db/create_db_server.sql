
CREATE TABLE IF NOT EXISTS services (service TEXT PRIMARY KEY, owner TEXT, config TEXT);
CREATE TABLE IF NOT EXISTS service_updates (service TEXT, obtained TIMESTAMP, created TIMESTAMP, server TEXT, data TEXT);

CREATE TABLE IF NOT EXISTS users (id SERIAL, created TIMESTAMP, login TEXT, password TEXT, name TEXT, org INTEGER);
CREATE TABLE IF NOT EXISTS tokens (created TIMESTAMP, login TEXT, token TEXT);
CREATE TABLE IF NOT EXISTS recovery_tokens (created TIMESTAMP, login TEXT, token TEXT);
CREATE INDEX recovery_token_index ON recovery_tokens(token);
CREATE INDEX token_index ON tokens(token);
CREATE INDEX user_index ON users(login);
CREATE INDEX service_updates_service_index ON service_updates(service);
CREATE INDEX service_updates_created_index ON service_updates(created);

CREATE TABLE events (
  service TEXT,
  server TEXT,
  start TIMESTAMP,
  endt TIMESTAMP,
  planned BOOLEAN,
  comment TEXT
);
CREATE INDEX events_service ON events(service);
CREATE INDEX events_server ON events(server);
