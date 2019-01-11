module.exports = function (app, sql, dbConfig) {

    // GET API
    app.get("/api/students", function (req, res) {
        var query = "select * from dreambook_student";
        executeQuery(req, res, query);
    });

    // GET For ID
    app.get("/api/student/:id", function (req, res) {
        var query = "select id ,full_name, mobile_number from dreambook_student WHERE ID='" + req.params.id + "'";
        executeQuery(req, res, query);
    });

    //Function to connect to database and execute query
    var executeQuery = function (req, res, query) {
        var connection = sql.createConnection(dbConfig);
        connection.connect(function (err) {
            if (err) {
                res.status(500);
                res.send(err);
            } else {
                connection.query(query, function (err, result) {
                    if (err) {
                        res.status(400);
                        res.send({ 'message': err.sqlMessage });
                    } else {
                        let response;
                        if (req.params.id) {
                            let model = JSON.parse(JSON.stringify(result));
                            response = model[0];
                        } else {
                            response = JSON.stringify(result);
                            res.status(200);
                        }
                        res.status(200);
                        res.send(response);

                    }
                });
            }
        });
        connection.on('error', function (err) {
            console.log("[mysql error]", err);
        });
    }

};