module.exports = function(app, sql, dbConfig) {


    app.post('/api/login', (req, res) => {
        console.log(req.body);
        var query = "select * from dreambook_student where id = 1";
        executeLoginQurey(req, res, query);
    });

    app.post('/api/register', (req, res) => {
        var query = "INSERT INTO dreambook_student (ID, Name, Age) VALUES ('" + req.body.ID + "','" + req.body.Name + "','" + req.body.Age + "')";
        executeRegQurey(req, res, query);
    });

    //Function to connect to database and execute query
    var executeLoginQurey = function(req, res, query) {
        var connection = sql.createConnection(dbConfig);
        connection.connect(function(err) {
            if (err) {
                res.status(500);
                res.send(err);
            } else {
                connection.query(query, function(err, result) {
                    if (err) {
                        res.status(400);
                        res.send({ 'message': err.sqlMessage });
                    } else {
                        if (result[0].Age.toString().toLowerCase() == req.body.Age.toString().toLowerCase()) {
                            var data = {
                                'token': 1234,
                                'name': result[0].Name,
                                'Age': result[0].Age,
                                'message': "Login Successfully"
                            }
                            res.status(200);
                            res.send(data);
                        } else {
                            res.status(400);
                            res.send({"message" : "invalid credential"});
                        }

                    }
                });
            }
        });
        connection.on('error', function(err) {
            console.log("[mysql error]", err);
        });
    }

    var executeRegQurey = function(req, res, query) {
        var connection = sql.createConnection(dbConfig);
        connection.connect(function(err) {
            if (err) {
                res.status(500);
                res.send(err);
            } else {
                connection.query(query, function(err, result) {
                    if (err) {
                        res.status(400);
                        res.send({ 'message': err.sqlMessage });
                    } else {
                        res.status(200);
                        res.send({ 'message': 'Successfully registered' });
                    }

                });
            }
        });
        connection.on('error', function(err) {
            console.log("[mysql error]", err);
        });
    }

};