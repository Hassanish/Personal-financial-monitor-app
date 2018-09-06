//express NPM module and .Router to route front end AJAX requests 
var express = require("express");
var router = express.Router();


//email and text js files
var email = require("../messaging/email")
var texts = require("../messaging/texts")

// Requiring our DB models
var db = require("../models");

// Handles adding user to DB
router.post("/api/users/", function (req, res) {

    console.log("in create User handler - /api/users/ - POST");
    console.log(req.body)
    // create takes an argument of an object describing the item we want to
    // insert into our table. In this case we just we pass in an object with a text
    // and complete property (req.body)
    console.log(req.body.phone)
    db.User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        userName: req.body.username,
        password: req.body.password,
        email: req.body.email,
        cellPhone: req.body.phone,
    }).then(function (dbUserResp) {

        // We have access to the new todo as an argument inside of the callback function
        res.json(JSON.stringify(dbUserResp));

        //functions from external .js file that send emails and texts
        email(dbUserResp.email, 'Welcome to the financial planner! ' + 'Your username is ' + dbUserResp.userName + " and your password is " + dbUserResp.password)
        texts(dbUserResp.cellPhone, 'Welcome to the financial planner! ' + 'Your username is ' + dbUserResp.userName + " and your password is " + dbUserResp.password)

    })
        .catch(function (err) {
            console.log("we got an error", err);
            // Whenever a validation or flag fails, an error is thrown
            // We can "catch" the error to prevent it from being "thrown", 
            // which could crash our node app
            res.status(400).send(err);

        });
});

// signin attempt of user
router.get("/api/users", function (req, res) {

    console.log("in signin attempt User handler - /api/users - GET");
    // create takes an argument of an object describing the item we want to
    // insert into our table. In this case we just we pass in an object with a text
    // and complete property (req.body)
    console.log(req.query)
    db.User.findOne({
        where: {
            userName: req.query.username,
            $and: [{
                password: req.query.password
            }]
        }

    }).then(function (dbUserResp) {
        var hbsObject = {
            data: "data",
        }
        console.log(dbUserResp.cellPhone)
        res.status(200).send(dbUserResp);
        // res.render("expenses", hbsObject);

    })
        .catch(function (dbUserResp) {
            console.log("username/password are incorrect", dbUserResp);
            // Whenever a validation or flag fails, an error is thrown
            // We can "catch" the error to prevent it from being "thrown", 
            // which could crash our node app


        });
});

// get expenses api
router.get("/api/expenses/:id", function (req, res) {

    console.log("in GET expenses handler - /api/expenses/:id - GET");
    // create takes an argument of an object describing the item we want to
    // insert into our table. In this case we just we pass in an object with a text
    // and complete property (req.body)
    db.User.findOne({
        where: {
            id: req.params.id
        },
        include: [db.Expense]
    }).then(function (dbExpenseResp) {
        res.status(200).send(dbExpenseResp);
    })
        .catch(function (dbExpenseResp) {
            console.log("expenses get had an error", dbExpenseResp);
            // Whenever a validation or flag fails, an error is thrown
            // We can "catch" the error to prevent it from being "thrown", 
            // which could crash our node app
            res.status(400).send(err);
        });
});

// Handles adding expense to DB
router.post("/api/expenses/:id", function (req, res) {

    console.log("in POST expenses handler - /api/expenses/:id - POST");
    // create takes an argument of an object describing the item we want to
    // insert into our table. In this case we just we pass in an object with a text
    // and complete property (req.body)
    console.log(req.body)
    db.Expense.create({
        UserId: req.params.id,
        itemName: req.body.item,
        amount: req.body.amount,
        category: req.body.category,
        datePaid: req.body.date_purchased,

    }).then(function (dbExpenseResp) {
        // We have access to the new todo as an argument inside of the callback function
        res.json(JSON.stringify(dbExpenseResp));
    })
        .catch(function (dbExpenseResp) {
            console.log("we got an error", dbExpenseResp);
            // Whenever a validation or flag fails, an error is thrown
            // We can "catch" the error to prevent it from being "thrown", 
            // which could crash our node app
            res.status(500).send(dbExpenseResp);

        });
});
// DELETE route for deleting expenses.
router.delete("/api/expenses/:id", function (req, res) {
    // specify which Expense we want to destroy with "where"
    db.Expense.destroy({
        where: {
            id: req.body.deleteId
        }
    }).then(function (dbExpenseResp) {
        res.json(dbExpenseResp);
    });

});

module.exports = router;


