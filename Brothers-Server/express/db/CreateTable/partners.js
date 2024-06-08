const partnersTable = `
  DO $$
  BEGIN
    IF NOT EXISTS (
      SELECT 1
      FROM pg_type
      WHERE typname = 'stackholder_type'
    ) THEN
      CREATE TYPE stackholder_type AS ENUM ('client', 'partner', 'both');
    END IF;
  END $$;
;

CREATE TABLE IF NOT EXISTS stackholders (
    id SERIAL PRIMARY KEY,
    logo TEXT,
    name VARCHAR(255) NOT NULL,
    user_id INTEGER NOT NULL,
    type stackholder_type NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
   
);`;

module.exports = { partnersTable };
