const selectUsersPasswordByEmail = "select password from users where email=$1";

module.exports = { selectUsersPasswordByEmail };
