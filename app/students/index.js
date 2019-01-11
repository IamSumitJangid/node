const studentRout = require('./get_students_details');
const loginRoutes = require('./authentication');
const studentEditRoutes = require('./add_update_student');


module.exports = function (app, sql) {
  var dbConfig = {
    user: "root",
    password: "",
    server: "localhost:8081",
    database: "dreambook_library"
  };
  studentRout(app, sql, dbConfig);
  loginRoutes(app, sql, dbConfig);
  studentEditRoutes(app, sql, dbConfig);
};