var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
  res
    .status(200)
    .json({
      directory: 'unversioned_api'
    })
    .end();
});

module.exports = router;
