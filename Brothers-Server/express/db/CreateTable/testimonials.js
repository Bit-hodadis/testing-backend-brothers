const testimonialsTable = `
  CREATE TABLE IF NOT EXISTS testimonials (
    id SERIAL PRIMARY KEY,
    description TEXT NOT NULL,
    user_id INTEGER,
    client_id INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id),
    CONSTRAINT fk_client FOREIGN KEY (client_id) REFERENCES stackholders(id)
);

    `;

module.exports = { testimonialsTable };
