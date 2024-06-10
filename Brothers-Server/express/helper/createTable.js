const { companyTable } = require("../db/CreateTable/company");
const { contactUsTable } = require("../db/CreateTable/contact_us");
const { newsTable } = require("../db/CreateTable/news");
const { newsCategoryTable } = require("../db/CreateTable/newsCategory");
const { partnersTable } = require("../db/CreateTable/partners");
const { productCategoryTable } = require("../db/CreateTable/productCategory");
const { productsTable } = require("../db/CreateTable/products");
const { servicecategoryTable } = require("../db/CreateTable/serviceCategory");
const { servicesTable } = require("../db/CreateTable/services");
const { subscriberTable } = require("../db/CreateTable/subscriber");
const { testimonialsTable } = require("../db/CreateTable/testimonials");
const { usersTable } = require("../db/CreateTable/users");
const { visitorsTable } = require("../db/CreateTable/visitors");
const { connect } = require("../db/connect/postgresql");

const createTables = async () => {
  let client;
  try {
    client = await connect();

    await client.query("BEGIN");
    await client.query(usersTable);
    await client.query(companyTable);
    await client.query(newsCategoryTable);
    await client.query(newsTable);
    await client.query(productCategoryTable);
    await client.query(productsTable);
    await client.query(servicecategoryTable);
    await client.query(servicesTable);
    await client.query(partnersTable);
    await client.query(testimonialsTable);
    await client.query(visitorsTable);
    await client.query(subscriberTable);
    await client.query(contactUsTable);
    console.log("tables are successfully created");
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Error creating tables:", error);
  } finally {
    if (client) client.release();
  }
};

module.exports = { createTables };
