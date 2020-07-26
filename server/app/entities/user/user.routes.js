const express = require('express');
const user = express.Router();
const userService = require('./user.service');

user.route('/')
    .post((req, res) => {
        userService.getUser(req.body)
            .then(user => {
                res.send(user);
            })
            .catch(err => {
                console.log(err);
            });
    });

user.route('/:login')
    .get((req, res) => {
        userService.getUserByLogin(req.params.login)
            .then(user => {
                res.send(user);
            })
            .catch(err => {
                console.log(err);
            });
    });

user.route('/liked/:login')
    .put((req, res) => {
        userService.updateLiked(req.params.login, req.body)
            .then(user => {
                res.send(user);
            })
            .catch(err => {
                console.log(err);
            });
    });

user.route('/register')
    .post((req, res) => {
        userService.addUser(req.body)
            .then(user => {
                res.send(user);
            })
            .catch(err => {
                console.log(err);
            });
    });




module.exports = user;
