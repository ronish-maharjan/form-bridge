-- migrate:up
ALTER TABLE users DROP CONSTRAINT uniq_inbox_mail;

-- migrate:down
ALTER TABLE users ADD CONSTRAINT uniq_inbox_mail UNIQUE (inbox_mail);
