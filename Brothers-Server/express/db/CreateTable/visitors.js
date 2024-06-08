const visitorsTable = `CREATE TABLE IF NOT EXISTS visitors (
    id SERIAL PRIMARY KEY,
    ip_address INET NOT NULL,
    visit_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`;

module.exports = { visitorsTable };
