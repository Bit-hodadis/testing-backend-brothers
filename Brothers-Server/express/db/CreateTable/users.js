const usersTable = `CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    email VARCHAR(100) UNIQUE,
    password VARCHAR(100),
    role VARCHAR(50),
    is_verified boolean default false,
    status VARCHAR(100) DEFAULT 'active',
    reset_password_token Text,
    verify_email_token Text,
    refresh_token Text,
    manager_id INT,
    FOREIGN KEY (manager_id) REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`;

module.exports = { usersTable };
