-- migrate:up
CREATE TABLE users (
    id UUID PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    inbox_mail VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_verified boolean NOT NULL DEFAULT  FALSE,
    password varchar(255) NOT NULL, 

    CONSTRAINT uniq_inbox_mail UNIQUE (inbox_mail),
    CONSTRAINT uniq_email UNIQUE (email)
);

CREATE OR REPLACE FUNCTION updateUserTimestamp()
RETURNS TRIGGER
AS $$
BEGIN
    NEW.updated_at := NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER updateUserTimestampTrigger
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE FUNCTION updateUserTimestamp();

-- migrate:down

DROP TRIGGER IF EXISTS updateUserTimestampTrigger ON users;
DROP FUNCTION IF EXISTS updateUserTimestamp();
DROP TABLE IF EXISTS users;
