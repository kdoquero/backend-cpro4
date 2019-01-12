"use strict"
const express = require('express');
var router = express.Router();
router.get('/', function (req, res) {
    res.send("welcome");
})
router.get('/test', function (req, res) {
    console.log('log test');

    res.send('test')
})

module.exports = router;