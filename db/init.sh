#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
    akori WITH SUPERUSER PASSWORD 'iroka';;
    CREATE DATABASE client;
    CREATE DATABASE server;
    GRANT ALL PRIVILEGES ON DATABASE client TO akori;
    GRANT ALL PRIVILEGES ON DATABASE server TO akori;
EOSQL

psql client < create_db_client.sql
psql server < create_db_server.sql

echo "host all  all    0.0.0.0/0  md5" >> /etc/postgresql/9.3/main/pg_hba.conf
echo "listen_addresses='*'" >> /etc/postgresql/9.3/main/postgresql.conf