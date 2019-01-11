module.exports = function(app, sql, dbConfig) {
    // post api
    app.post("/api/student", function(req, res) {
        var query = "INSERT INTO dreambook_student (student_name, student_mobile, id_student_shift, discount, fees_month, addmission_date, active) VALUES ('" + req.body.name + "','" + req.body.mobile + "','" + req.body.idShift + "', '"+req.body.discount+"', '"+req.body.feeMonth+"', '"+req.body.addmission_date+"', '"+req.body.active+"')";
        executeQuery(req, res, query, 'added');
    });

    // PUT API 
    app.put("/api/student/:id", function(req, res) {
        var active = req.body.active ? 1 : 0;
        var query = "UPDATE dreambook_student SET Name = '" + req.body.Name + "' , Age=  '" + req.body.Age + "', active= '" +active+ "'  WHERE ID= '" + req.params.id + "'";
        executeQuery(req, res, query, 'updated');
    });

    // DELETE API
    app.delete("/api/student/:id", function(req, res) {
        var query = "DELETE FROM dreambook_student WHERE id='" + req.params.id + "'";
        executeQuery(req, res, query, 'deleted');
    });

    //Function to connect to database and execute query
    var executeQuery = function(req, res, query, msg) {
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
                            console.log(result);
                            res.status(200);
                            res.send({
                                'message': 'successfully ' + msg,
                                'id': req.params.id ? req.params.id : result.insertId
                            });
                        }
                    });


            }
        });
        connection.on('error', function(err) {
            console.log("[mysql error]", err);
        });
    }
};