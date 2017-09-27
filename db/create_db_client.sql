CREATE TABLE IF NOT EXISTS logs (id BIGSERIAL, service TEXT, created TIMESTAMP, err TEXT, msg TEXT, success BOOLEAN, changed BOOLEAN, check_cfg TEXT, content TEXT, previous TEXT, duration DECIMAL);
create index created_index on logs(created);
create index service_index on logs(service);
