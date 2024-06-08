const registerEmployeeQuery = `insert into users(first_name,last_name,email,verify_email_token,manager_id) values($1,$2,$3,$4,$5)`;

module.exports = { registerEmployeeQuery };
