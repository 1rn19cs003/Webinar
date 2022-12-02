module.exports = function (app, db) {
    // root-route for server
    app.get("/admin", (req, res) => {
        try {
            db.query("SELECT * FROM users;", (error, results, fields) => {
                if (error) throw error;
                console.log(results);
                res.send(results);
            });
        } catch (error) {
            console.log(error);
            res.send(error);
        }
    });


    app.post("/signUp", (req, res) => {
        let k = req.body;
        console.log(k);
        try {
            db.query("INSERT INTO USERS(email,password,admin) VALUES (?,?,?);",
                [k.email, k.password, k.admin], (error, results, fields) => {
                    if (error) {
                        res.json({
                            status: 400,
                            message: "error occured",
                            error: error
                        })
                    }
                    console.log(results);
                    res.json({
                        status: 200,
                        message: "user added successfully", results,
                    });
                });
        } catch (error) {
            res.status(400).send({
                message: "error",
                error: error,
            });
        }
    })


    app.post("/signIn", (req, res) => {
        try {
            db.query(
                "SELECT * FROM USERS WHERE email=? AND password=?;",
                [req.body.email, req.body.password],
                (error, results, fields) => {
                    if (error) {
                        res.json({
                            status: 400,
                            message: "error occured",
                            error: error
                        })
                    }
                    console.log(results);
                    res.json({
                        status: 200,
                        message: "user LoggedIn successfully", results,
                    });
                }
            )
        } catch (error) {
            res.json({
                status: 400,
                message: "error occured",
                error: error
            });
        }
    })

    app.post("/addProduct", (req, res) => {
        try {
            db.query(
                "INSERT INTO PRODUCTS(productName,productPrice,imageLink,productDescription) VALUES (?,?,?,?);",
                [req.body.productName, req.body.productPrice, req.body.imageLink, req.body.productDescription],
                (error, results, fields) => {
                    if (error) {
                        res.json({
                            status: 400,
                            message: "error occured",
                            error: error
                        })
                    }
                    console.log(results);
                    res.json({
                        status: 200,
                        message: "product added successfully", results,
                    });
                }
            )
        } catch (error) {
            res.json({
                status: 400,
                message: "error occured",
                error: error
            });
        }
    })

    app.get("/allProduct", (req, res) => {
        try {
            db.query(
                "SELECT * FROM PRODUCTS;",
                (error, results, fields) => {
                    if (error) {
                        res.json({
                            status: 400,
                            message: "error occured",
                            error: error
                        })
                    }
                    // console.log(results);
                    res.status(200).json(results);
                }
            )
        } catch (error) {
            res.json({
                status: 400,
                message: "error occured",
                error: error
            });
        }
    })

    app.get("/product/name", (req, res) => {
        try {
            db.query(
                "SELECT * FROM PRODUCTS WHERE productName=?;",
                [req.body.productName],
                (error, results, fields) => {
                    if (error) {
                        res.json({
                            status: 400,
                            message: "error occured",
                            error: error
                        })
                    }
                    // console.log(results[0]==null)
                    // let prod = Object.values(JSON.parse(JSON.stringify(results)));
                    else if (results[0] == null) {
                        res.json({
                            status: 400,
                            message: "product not found",
                        });
                    } else {
                        // console.log(results);
                        // prod.forEach((v) => console.log(v));
                        res.status(200).json(results);
                    }
                }
            )
        } catch (error) {
            res.json({
                status: 400,
                message: "error occured",
                error: error
            });
        }
    })

    app.delete("/deleteProduct", (req, res) => {
        try {
            db.query(
                "DELETE FROM PRODUCTS WHERE productName=?;",
                [req.body.productName],
                (error, results, fields) => {
                    if (error) {
                        res.json({
                            status: 400,
                            message: "error occured",
                            error: error
                        })
                    }
                    else if (results[0] == null) {
                        res.json({
                            status: 400,
                            message: "product not found",
                        });
                    } else {
                        console.log(results.length);
                        res.status(200).json({
                            message: "product deleted successfully",
                            results
                        });
                    }
                }
            )
        } catch (error) {
            res.json({
                status: 400,
                message: "error occured",
                error: error
            });
        }
    })


    app.put("/updateProduct",(req,res)=>{
        try{
            db.query(
                "UPDATE PRODUCTS SET productPrice=?,imageLink=?,productDescription=? WHERE productName=?;",
                [req.body.productPrice,req.body.imageLink,req.body.productDescription,req.body.productName],
                (error,results,fields)=>{
                    console.log(results)
                    if(error){
                        res.json({
                            status: 400,
                            message: "error occured",
                            error: error
                        });
                    } else {
                        // console.log(results.length);
                        res.status(200).json({
                            message: "product updated successfully",
                            results
                        });
                    }
                }
            )
        }catch(error){
            res.json({
                status: 400,
                message: "error occured",
                error: error
            });
        }
    })
};