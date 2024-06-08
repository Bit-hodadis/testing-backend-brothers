const productCategoryTable = `CREATE TABLE IF NOT EXISTS  product_category (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`;

module.exports = { productCategoryTable };
