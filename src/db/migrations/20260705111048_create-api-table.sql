-- migrate:up

CREATE TABLE apis (
    id UUID PRIMARY KEY,
    user_id UUID NOT NULL,
    url VARCHAR(255) NOT NULL,
    api_key VARCHAR(255) NOT NULL,

    CONSTRAINT uniq_api_key UNIQUE (api_key),
    CONSTRAINT uniq_user_id UNIQUE(user_id,url),

    CONSTRAINT fk_user_id
        FOREIGN KEY (user_id)
        REFERENCES users(id)
);

-- migrate:down

DROP TABLE IF EXISTS apis;
