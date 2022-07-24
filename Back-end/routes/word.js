const express = require('express');
const router = express.Router();
const { getRandomWords, getRank } = require('../controllers/word');

router.route('/').get(getRandomWords);
router.route('/getRank').post(getRank);

module.exports = router;
