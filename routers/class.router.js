const express = require('express');
var router = express.Router();
const ClassController = require('../controllers/class.controller');


router.post('/create', ClassController.createReq);

router.post('/turnoff', ClassController.turnoff);

router.post('/confirm/:reqid', ClassController.confirmReq);



module.exports = router;