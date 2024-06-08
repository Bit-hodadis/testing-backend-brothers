const newsTable = `CREATE TABLE IF NOT EXISTS news (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT,
    image TEXT,
    users_id INTEGER,
    published_date TIMESTAMP,
    category_id INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (users_id) REFERENCES users(id)
    ,
    FOREIGN KEY (category_id) REFERENCES news_category(id) ON DELETE CASCADE
);
`;

module.exports = { newsTable };
