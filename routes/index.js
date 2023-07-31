var express = require("express");
var router = express.Router();
const connection = require("../config/db");
/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Isa' });
// });
// //localhost:3000/helloWorld
// router.get("/", (req, res) => {
//   res.send("Hello world con Express Generator");
// });
//localhost:3000/castle
router.get("/castle", (req, res) => {
  connection.query('SELECT * FROM warrior', (error, result) => {
    if (error) throw error;
    console.log(result); 
  res.render("castle", {result});
});
});
module.exports = router;