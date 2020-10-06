const express = require('express');
var router = express.Router();
const classRoutes = require('./class.router');


router.use('/classrequests',classRoutes);


module.exports = router;